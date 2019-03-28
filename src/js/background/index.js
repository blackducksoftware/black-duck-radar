import 'babel-polyfill';
import { createStore, getState, dispatch } from './store';
import Tabs from './controllers/tabs';
import Button from './controllers/button';
import ForgeComponent from './models/forge-component';
import Frame from './models/frame';
import { setForgeComponentKeys } from './store/actions/forge';
import { performBlackduckConfiguredCheck } from './store/actions/hub-auth';
import { collectUsageData } from './store/actions/hub-component';
import { setChromeExtensionDetails } from './store/actions/extension';
import { clearStore } from './store/actions/app';

// Init IIFE
(async () => {
    // the store is initialized first, to isolate the asynchronicity of reading from persistent storage
    await createStore();

    const processTabUpdate = async (tab, updateSummary = {}) => {
        const didNavigate = updateSummary.status === 'loading';
        const { url, id: tabId } = tab;
        const frame = new Frame(tab);
        // We've navigated, but a page unload event never fired so the frame is still inserted
        const isUrlHashUpdate = didNavigate && frame.isInserted();
        let componentKeys = getState('forgeComponentKeysMap', tabId);
        let externalComponent = getState('hubExternalComponentMap', tabId);
        const hasComponentKeys = Boolean(componentKeys);

        if (isUrlHashUpdate) {
            // The browser URL has changed but the document hasn't reloaded,
            // probably because of navigating to a hash url. Unload the app because
            // the state is potentially out of sync (this may no longer be a component page)
            frame.unload();
            return;
        } else if (componentKeys && didNavigate) {
            // Clear the redux store entries for this tabId. This is important, otherwise the memory footprint
            // for redux will grow during the runtime of the application and eventually crash the extension
            dispatch(clearStore({ tabId }));
            externalComponent = null;
            componentKeys = null;
        }

        if (externalComponent) {
            // We've already fetched an external component for this tab
            return;
        }

        const chromeExtensionDetails = chrome.app.getDetails();
        dispatch(setChromeExtensionDetails({ chromeExtensionDetails }));

        Button.toggleGlow({
            isEnabled: false,
            tabId
        });

        if (hasComponentKeys === false) {
            const forgeComponent = new ForgeComponent();
            // This could be synchronous if we're parsing the keys from the url, but in cases
            // like NPM where we need to parse them from the DOM, it may be asynchronous
            componentKeys = await forgeComponent.parseExternalKeys({
                tabId,
                url
            });

            if (componentKeys) {
                dispatch(setForgeComponentKeys({
                    tabId,
                    componentKeys
                }));
            }
        }
        dispatch(performBlackduckConfiguredCheck({ tabId }));
        dispatch(collectUsageData({ tabId }));
    };

    Tabs.addActivationListener(processTabUpdate);
    Tabs.addUpdateListener(processTabUpdate);

    Button.addOnClickListener(tab => {
        const frame = new Frame(tab);

        if (frame.isInserted()) {
            frame.toggleVisibility();
        } else {
            frame.load();
        }
    });

    try {
        const activeTab = await Tabs.getActive();
        if (activeTab) {
            processTabUpdate(activeTab);
        }
    } catch (err) { /* do nothing */ }
})();
