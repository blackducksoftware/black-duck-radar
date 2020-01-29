/*
 *  black-duck-radar
 *
 *  Copyright (c) 2019 Synopsys, Inc.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements. See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership. The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied. See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

import PersistentStorage from '../persistent-storage';
import * as store from '../index';
import {
    BLACKDUCK_BEARER_TOKEN_SET,
    BLACKDUCK_TOKEN_SET,
    ARTIFACTORY_URL_SET,
    HUB_AUTH_STATE_SET,
    HUB_LOGIN_WINDOW_SET,
    HUB_ORIGIN_SET,
    HUB_USERNAME_SET
} from 'shared/actions/types';
import { performPhoneHomeIfNeeded, refreshComponent } from './hub-component';
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

export const setArtifactoryUrl = (artifactoryUrl) => {
    const type = ARTIFACTORY_URL_SET;
    return {
        type,
        artifactoryUrl
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
        const forgeComponentKeysMap = store.getState('forgeComponentKeysMap');
        try {
            const componentKeys = forgeComponentKeysMap[tabId] || {};
            const token = await hubController.requestBearerToken({
                blackduckToken: blackduckApiToken,
                componentKeys
            });
            await dispatch(setBearerToken(token));
            if (token) {
                dispatch(setBlackduckConfiguredState(loginEnum.CONFIGURED));
                // check if there is data for the tab in the extension
                // this is a tab the extension should display data.

                if (componentKeys) {
                    dispatch(performPhoneHomeIfNeeded());
                    dispatch(refreshComponent({ tabId }));
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
            blackduckApiToken: null,
            artifactoryUrl: null
        }, (items) => {
            const { blackduckUrl, blackduckApiToken, artifactoryUrl } = items;
            const decodedApiToken = blackduckApiToken? atob(blackduckApiToken) : null;
            if (blackduckUrl) {
                dispatch(setBlackduckOrigin(blackduckUrl));
            }

            if (decodedApiToken) {
                dispatch(setBlackduckToken(decodedApiToken));
            }

            if(artifactoryUrl) {
                dispatch(setArtifactoryUrl(artifactoryUrl));
            }
            const urlMissing = !blackduckUrl || blackduckUrl.length <= 0;
            const tokenMissing = !decodedApiToken || decodedApiToken.length <= 0;
            const invalidConfig = (urlMissing && !tokenMissing)
                || (!urlMissing && tokenMissing);

            if (urlMissing && tokenMissing) {
                dispatch(setBlackduckConfiguredState(loginEnum.NOT_CONFIGURED));
            } else if (invalidConfig) {
                dispatch(setBlackduckConfiguredState(loginEnum.INVALID_CONFIG));
            } else {
                dispatch(performBearerTokenRequest({
                    blackduckApiToken: decodedApiToken,
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
            dispatch(refreshComponent({ tabId: parentId }));
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
