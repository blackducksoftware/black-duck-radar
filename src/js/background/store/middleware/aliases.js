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
    refreshComponent,
    syncHubComponentPolicyRules,
    syncHubComponentRiskProfile,
    syncHubComponentVersion,
    syncHubComponentVersionReferenceProjects,
    syncHubComponentVulnerabilities,
    syncHubExternalComponent,
    syncHubProjectVersionComponents
} from '../actions/hub-component';

import { openHubLoginWindow, performHubLogin, performHubLogout } from '../actions/hub-auth';

import { displayOptionsPage, unload, updateExtensionIcon } from '../actions/app';

import {
    APP_UNLOAD,
    DISPLAY_OPTIONS_PAGE,
    HUB_COMPONENT_POLICIES_SYNC,
    HUB_COMPONENT_REFRESH,
    HUB_COMPONENT_RISK_PROFILE_SYNC,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SYNC,
    HUB_COMPONENT_VERSION_SYNC,
    HUB_COMPONENT_VULNERABILITIES_SYNC,
    HUB_EXTERNAL_COMPONENT_SYNC,
    HUB_LOGIN,
    HUB_LOGIN_WINDOW_OPEN,
    HUB_LOGOUT,
    HUB_PROJECT_VERSION_COMPONENTS_SYNC,
    UPDATE_EXTENSION_ICON
} from 'shared/actions/types';

// Action aliases allow the client-side app to trigger actions in the background
export default {
    [APP_UNLOAD]: unload,
    [HUB_LOGIN]: performHubLogin,
    [HUB_LOGOUT]: performHubLogout,
    [HUB_EXTERNAL_COMPONENT_SYNC]: syncHubExternalComponent,
    [HUB_COMPONENT_VERSION_SYNC]: syncHubComponentVersion,
    [HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SYNC]: syncHubComponentVersionReferenceProjects,
    [HUB_PROJECT_VERSION_COMPONENTS_SYNC]: syncHubProjectVersionComponents,
    [HUB_COMPONENT_POLICIES_SYNC]: syncHubComponentPolicyRules,
    [HUB_COMPONENT_VULNERABILITIES_SYNC]: syncHubComponentVulnerabilities,
    [HUB_COMPONENT_RISK_PROFILE_SYNC]: syncHubComponentRiskProfile,
    [HUB_LOGIN_WINDOW_OPEN]: openHubLoginWindow,
    [HUB_COMPONENT_REFRESH]: refreshComponent,
    [DISPLAY_OPTIONS_PAGE]: displayOptionsPage,
    [UPDATE_EXTENSION_ICON]: updateExtensionIcon
};
