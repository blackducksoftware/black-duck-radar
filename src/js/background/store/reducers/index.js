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

import { combineReducers } from 'redux';

import { forgeComponentKeysMap } from './background-state';

import { chromeExtensionDetails, frameVisibilityMap, loadStateMap, menuStateMap } from './app-state';

import { blackduckBearerToken, blackduckConfiguredState, blackduckOrigin, blackduckToken, hubUsername, isHubLoginOpen } from './hub/auth';

import {
    hubComponentPolicyRulesMap,
    hubComponentRiskProfileMap,
    hubComponentVersionMap,
    hubComponentVersionReferenceProjectsMap,
    hubComponentVulnerabilitiesMap,
    hubExternalComponentMap,
    hubProjectVersionComponentsMap,
    fetchingData
} from './hub/component';

// Component data is mapped to tabId so that we can clean up memory once the tab has been closed
// It's important to delete each tab's state on navigation or close
const rootReducer = combineReducers({
    // BlackDuck url origin
    blackduckOrigin,
    // BlackDuck token
    blackduckToken,
    // BlackDuck Bearer token
    blackduckBearerToken,
    // Hub login username
    hubUsername,
    // Hub connection status
    blackduckConfiguredState,
    // Is the Hub login window open
    isHubLoginOpen,
    // map from tabId to parsed component keys
    forgeComponentKeysMap,
    // map from tabId to frame visibility status
    frameVisibilityMap,
    // map from tabId to app load status
    loadStateMap,
    // map from tabId to selected menu item
    menuStateMap,
    // map from tabId to external hub component
    hubExternalComponentMap,
    // map from tabId to hub component version
    hubComponentVersionMap,
    // map from tabId to component version project references
    hubComponentVersionReferenceProjectsMap,
    // map from tabId to project version components
    hubProjectVersionComponentsMap,
    // map from tabId to component policy rules
    hubComponentPolicyRulesMap,
    // map from tabId to component vulnerabilities
    hubComponentVulnerabilitiesMap,
    // map from tabId to component risk profile
    hubComponentRiskProfileMap,
    // chrome extension information
    chromeExtensionDetails,
    // if there are outstanding requests for data
    fetchingData
});

export default rootReducer;
