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

import 'babel-polyfill';
import { createStore, dispatch, getState } from './store';
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

    const forgeComponent = new ForgeComponent();


    const processTabUpdate = async (tab, updateSummary = {}) => {
        const didNavigate = updateSummary.status === 'loading';
        const { url, id: tabId } = tab;
        const frame = new Frame(tab);
        // We've navigated, but a page unload event never fired so the frame is still inserted
        const isUrlHashUpdate = didNavigate && frame.isInserted();
        let componentKeys = getState('forgeComponentKeysMap', tabId);
        let externalComponent = getState('hubExternalComponentMap', tabId);
        const artifactoryUrl = getState('artifactoryUrl');
        const hasComponentKeys = Boolean(componentKeys);
        await forgeComponent.loadDefinitions({ artifactoryUrl });
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
        dispatch(performBlackduckConfiguredCheck({ tabId }));
        const chromeExtensionDetails = chrome.app.getDetails();
        dispatch(setChromeExtensionDetails({ chromeExtensionDetails }));

        if (externalComponent) {
            // We've already fetched an external component for this tab
            return;
        }

        Button.toggleGlow({
            isEnabled: false,
            tabId
        });

        if (hasComponentKeys === false) {
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
    } catch (err) { /* do nothing */
    }
})();
