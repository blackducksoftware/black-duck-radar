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

import {
    APP_UNLOAD,
    DISPLAY_OPTIONS_PAGE,
    HUB_COMPONENT_POLICIES_SYNC,
    HUB_COMPONENT_REFRESH,
    HUB_COMPONENT_RISK_PROFILE_SYNC,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SYNC,
    HUB_COMPONENT_VERSION_SYNC,
    HUB_COMPONENT_VULNERABILITIES_SYNC,
    HUB_EXTERNAL_VULNERABILITIES_SYNC,
    HUB_LOGIN,
    HUB_LOGIN_WINDOW_OPEN,
    HUB_LOGOUT,
    HUB_PROJECT_VERSION_COMPONENTS_SYNC,
    UPDATE_EXTENSION_ICON
} from 'shared/actions/types';

export const displayOptionsPage = () => {
    return {
        type: DISPLAY_OPTIONS_PAGE
    };
};

export const performHubLoginAlias = ({ blackduckOrigin, hubUserName, hubPassword }) => {
    return {
        type: HUB_LOGIN,
        origin: blackduckOrigin,
        username: hubUserName,
        password: hubPassword
    };
};

export const performHubLogoutAlias = () => {
    return {
        type: HUB_LOGOUT
    };
};

export const unloadAppAlias = (tabId) => {
    return {
        type: APP_UNLOAD,
        tabId
    };
};

export const syncHubExternalVulnerabilitiesAlias = (tabId) => {
    return {
        type: HUB_EXTERNAL_VULNERABILITIES_SYNC,
        tabId
    };
};

export const syncHubComponentVersionAlias = (tabId, externalComponent) => {
    return {
        type: HUB_COMPONENT_VERSION_SYNC,
        tabId,
        externalComponent
    };
};

export const syncHubComponentVersionReferenceProjectsAlias = (tabId, componentVersion) => {
    return {
        type: HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SYNC,
        tabId,
        componentVersion
    };
};

export const syncHubProjectVersionComponentsAlias = (tabId, externalComponent, referenceProjects) => {
    return {
        type: HUB_PROJECT_VERSION_COMPONENTS_SYNC,
        tabId,
        externalComponent,
        referenceProjects
    };
};

export const syncHubComponentPolicyRulesAlias = (tabId, projectVersionComponents) => {
    return {
        type: HUB_COMPONENT_POLICIES_SYNC,
        tabId,
        projectVersionComponents
    };
};

export const syncHubComponentVulnerabilitiesAlias = (tabId, componentVersion) => {
    return {
        type: HUB_COMPONENT_VULNERABILITIES_SYNC,
        tabId,
        componentVersion
    };
};

export const syncHubComponentRiskProfileAlias = (tabId, componentVersion) => {
    return {
        type: HUB_COMPONENT_RISK_PROFILE_SYNC,
        tabId,
        componentVersion
    };
};

export const openHubLoginWindowAlias = (parentWindow) => {
    return {
        type: HUB_LOGIN_WINDOW_OPEN,
        parentWindow
    };
};

export const refreshComponentAlias = (tabId) => {
    return {
        type: HUB_COMPONENT_REFRESH,
        tabId
    };
};

export const updateExtensionIconAlias = (tabId) => {
    return {
        type: UPDATE_EXTENSION_ICON,
        tabId
    };
};
