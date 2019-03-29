import PersistentStorage from '../persistent-storage';
import * as store from '../index';
import {
    BLACKDUCK_BEARER_TOKEN_SET,
    BLACKDUCK_TOKEN_SET,
    HUB_AUTH_STATE_SET,
    HUB_LOGIN_WINDOW_SET,
    HUB_ORIGIN_SET,
    HUB_USERNAME_SET
} from 'shared/actions/types';
import { performPhoneHomeIfNeeded, syncHubExternalVulnerabilities } from './hub-component';
import { loginEnum } from 'shared/constants';
import Hub from 'background/controllers/hub';
import Tabs from 'background/controllers/tabs';
import Windows from 'background/controllers/windows';
import { clearHubData } from 'background/store/actions/app';
import Button from 'background/controllers/button';

const hubController = new Hub();

export const setBlackduckOrigin = (origin) => {
    const type = HUB_ORIGIN_SET;
    return {
        type,
        origin
    };
};

export const setBlackduckToken = (token) => {
    const type = BLACKDUCK_TOKEN_SET;
    return {
        type,
        token
    };
};

export const setBearerToken = (token) => {
    const type = BLACKDUCK_BEARER_TOKEN_SET;
    return {
        type,
        token
    };
};

export const setHubUsername = (username) => {
    const type = HUB_USERNAME_SET;
    return {
        type,
        username
    };
};

export const setBlackduckConfiguredState = (status) => {
    const type = HUB_AUTH_STATE_SET;
    return {
        type,
        status
    };
};

export const setHubWindowOpen = (isOpen) => {
    const type = HUB_LOGIN_WINDOW_SET;
    return {
        type,
        isOpen
    };
};

export const performBearerTokenRequest = ({ blackduckApiToken, tabId }) => {
    return async (dispatch) => {
        const componentKeys = store.getState('forgeComponentKeysMap');
        try {
            const token = await hubController.requestBearerToken({ blackduckToken: blackduckApiToken });
            dispatch(setBearerToken(token));
            if (token) {
                dispatch(setBlackduckConfiguredState(loginEnum.CONFIGURED));
                // check if there is data for the tab in the extension
                // this is a tab the extension should display data.
                if (componentKeys && tabId && tabId.toString() in componentKeys) {
                    dispatch(performPhoneHomeIfNeeded());
                    dispatch(syncHubExternalVulnerabilities({ tabId }));
                }
            } else {
                dispatch(setBlackduckConfiguredState(loginEnum.INVALID_CONFIG));
            }
        } catch (err) {
            dispatch(setBlackduckConfiguredState(loginEnum.INVALID_CONFIG));
        }
    };
};

export const performBlackduckConfiguredCheck = ({ tabId }) => {
    return async (dispatch) => {
        dispatch(setBlackduckConfiguredState(loginEnum.CONFIGURATION_PENDING));
        chrome.storage.local.get({
            blackduckUrl: null,
            blackduckApiToken: null
        }, (items) => {
            const { blackduckUrl, blackduckApiToken } = items;
            if (blackduckUrl) {
                dispatch(setBlackduckOrigin(blackduckUrl));
            }

            if (blackduckApiToken) {
                dispatch(setBlackduckToken(blackduckApiToken));
            }
            const urlMissing = !blackduckUrl || blackduckUrl.length <= 0;
            const tokenMissing = !blackduckApiToken || blackduckApiToken.length <= 0;
            const invalidConfig = (urlMissing && !tokenMissing)
                || (!urlMissing && tokenMissing);

            if (urlMissing && tokenMissing) {
                dispatch(setBlackduckConfiguredState(loginEnum.NOT_CONFIGURED));
            } else if (invalidConfig) {
                dispatch(setBlackduckConfiguredState(loginEnum.INVALID_CONFIG));
            } else {
                dispatch(performBearerTokenRequest({
                    blackduckApiToken,
                    tabId
                }));
            }
        });
    };
};

export const performHubLogin = ({ origin, username, password, parentId }) => {
    return async (dispatch) => {
        dispatch(setBlackduckOrigin(origin));
        dispatch(setHubUsername(username));
        dispatch(setBlackduckConfiguredState(loginEnum.CONFIGURATION_PENDING));

        PersistentStorage.setState({
            blackduckOrigin: origin,
            hubUsername: username
        });

        try {
            await hubController.login({
                username,
                password
            });
            dispatch(syncHubExternalVulnerabilities({ tabId: parentId }));
        } catch (err) {
            dispatch(setBlackduckConfiguredState(loginEnum.NOT_CONFIGURED));
            throw err;
        }

        try {
            const extensionDetails = store.getState('chromeExtensionDetails');
            const { version } = extensionDetails;
            await hubController.phoneHome('Radar', version, version);
        } catch (err) {
            if (DEBUG_AJAX) {
                console.log('Phone home failed: ', err);
            }
        }

        dispatch(setBlackduckConfiguredState(loginEnum.CONFIGURED));
    };
};

export const performHubLogout = () => {
    return async (dispatch) => {
        dispatch(setBlackduckConfiguredState(loginEnum.DISCONNECTION_PENDING));
        await hubController.logout();
        dispatch(setBlackduckConfiguredState(loginEnum.NOT_CONFIGURED));
        chrome.windows.getAll({ populate: true }, (windows) => {
            windows.forEach((window) => {
                window.tabs.forEach((tab) => {
                    const tabId = tab.id;
                    dispatch(clearHubData(tabId));
                    Button.toggleGlow({
                        isEnabled: false,
                        tabId
                    });
                });
            });
        });
    };
};

export const openHubLoginWindow = ({ parentWindow }) => {
    return async (dispatch) => {
        const isWindowOpen = store.getState('isHubLoginOpen');

        if (isWindowOpen) {
            return;
        }

        let loginId;
        const closeListener = (windowId) => {
            if (loginId === windowId) {
                Windows.removeCloseListener(closeListener);
                dispatch(setHubWindowOpen(false));
            }
        };

        dispatch(setHubWindowOpen(true));

        const { id: tabId } = await Tabs.create({
            url: chrome.extension.getURL('login.html'),
            active: false
        });

        Windows.addCloseListener(closeListener);

        const width = 500;
        const height = 768;
        const origin = store.getState('blackduckOrigin');
        const username = store.getState('hubUsername');
        const { parentId } = parentWindow;
        const dimensions = {
            width,
            height
        };
        const opts = Object.assign(
            {
                focused: true,
                type: 'normal',
                tabId: Number(tabId)
            },
            dimensions,
            Windows.getCenteredPosition(Object.assign({}, dimensions, parentWindow))
        );

        loginId = (await Windows.create(opts)).id;

        window.performHubLoginGlobal = (options) => {
            return dispatch(performHubLogin(options));
        };

        window.getLoginFormDataGlobal = () => {
            return {
                parentId,
                width,
                height,
                origin,
                username
            };
        };
    };
};
