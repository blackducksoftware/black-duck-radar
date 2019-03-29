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

import * as store from 'background/store';
import Tabs from 'background/controllers/tabs';
import Button from 'background/controllers/button';
import { loadEnum } from 'shared/constants';
import {
    deleteHubComponentPolicyRules,
    deleteHubComponentRiskProfile,
    deleteHubComponentVersion,
    deleteHubComponentVersionReferenceProjects,
    deleteHubComponentVulnerabilities,
    deleteHubExternalComponent,
    deleteHubProjectVersionComponents
} from './hub-component';
import { deleteFrameVisibilityState, deleteLoadState, deleteMenuState, hideFrame, setLoadState } from 'shared/actions/app';
import { deleteForgeComponentKeys } from './forge';

export const load = ({ tabId, componentKeys }) => {
    return async (dispatch) => {
        // Hide the frame initially, so that we can animate its opening
        dispatch(hideFrame(tabId));

        dispatch(setLoadState(tabId, loadEnum.LOADING));

        await Tabs.loadApp({
            tabId,
            componentKeys
        });

        dispatch(setLoadState(tabId, loadEnum.LOADED));
    };
};

export const clearHubData = (tabId) => {
    return (dispatch) => {
        // clean up the state associated with items obtained from the hub
        dispatch(deleteHubExternalComponent(tabId));
        dispatch(deleteHubComponentVersion(tabId));
        dispatch(deleteHubComponentVersionReferenceProjects(tabId));
        dispatch(deleteHubProjectVersionComponents(tabId));
        dispatch(deleteHubComponentPolicyRules(tabId));
        dispatch(deleteHubComponentVulnerabilities(tabId));
        dispatch(deleteHubComponentRiskProfile(tabId));
    };
};

export const clearStore = ({ tabId }) => {
    return (dispatch) => {
        // Clean up the state associated with this tab. This is important, otherwise the store
        // would continue to grow for the user's browsing session
        dispatch(clearHubData(tabId));
        dispatch(deleteFrameVisibilityState(tabId));
        dispatch(deleteForgeComponentKeys(tabId));
        dispatch(deleteMenuState(tabId));
        dispatch(deleteLoadState(tabId));
    };
};

export const unload = ({ tabId }) => {
    return async (dispatch) => {
        dispatch(setLoadState(tabId, loadEnum.UNLOADING));
        Tabs.unmountFrame(tabId)
            .catch(() => {
            });
        dispatch(clearStore({ tabId }));
    };
};

export const updateExtensionIcon = ({ tabId }) => {
    return () => {
        const externalComponent = store.getState('hubExternalComponentMap', tabId);
        const vulnerabilities = store.getState('hubComponentVulnerabilitiesMap', tabId);
        const policyList = store.getState('hubComponentPolicyRulesMap', tabId);

        Button.toggleGlow({
            tabId,
            isEnabled: Boolean(externalComponent),
            isDangerous: Boolean(vulnerabilities && vulnerabilities.length),
            isPolicyViolated: Boolean(policyList && policyList.length)
        });
    };
};

export const displayOptionsPage = () => {
    return () => {
        chrome.runtime.openOptionsPage();
    };
};
