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
    HUB_COMPONENT_POLICIES_DELETE,
    HUB_COMPONENT_POLICIES_SET,
    HUB_COMPONENT_RISK_PROFILE_DELETE,
    HUB_COMPONENT_RISK_PROFILE_SET,
    HUB_COMPONENT_VERSION_DELETE,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_DELETE,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SET,
    HUB_COMPONENT_VERSION_SET,
    HUB_COMPONENT_VULNERABILITIES_DELETE,
    HUB_COMPONENT_VULNERABILITIES_SET,
    HUB_EXTERNAL_COMPONENT_DELETE,
    HUB_EXTERNAL_COMPONENT_SET,
    HUB_PROJECT_VERSION_COMPONENTS_DELETE,
    HUB_PROJECT_VERSION_COMPONENTS_SET
} from 'shared/actions/types';

export const hubExternalComponentMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_EXTERNAL_COMPONENT_SET:
            return Object.assign({}, state, action.hubExternalComponentMap);
        case HUB_EXTERNAL_COMPONENT_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubComponentVersionMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_COMPONENT_VERSION_SET:
            return Object.assign({}, state, action.hubComponentVersionMap);
        case HUB_COMPONENT_VERSION_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubComponentVersionReferenceProjectsMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SET:
            return Object.assign({}, state, action.hubComponentVersionReferenceProjectsMap);
        case HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubProjectVersionComponentsMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_PROJECT_VERSION_COMPONENTS_SET:
            return Object.assign({}, state, action.hubProjectVersionComponentsMap);
        case HUB_PROJECT_VERSION_COMPONENTS_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubComponentPolicyRulesMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_COMPONENT_POLICIES_SET:
            return Object.assign({}, state, action.hubComponentPolicyRulesMap);
        case HUB_COMPONENT_POLICIES_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubComponentVulnerabilitiesMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_COMPONENT_VULNERABILITIES_SET:
            return Object.assign({}, state, action.hubComponentVulnerabilitiesMap);
        case HUB_COMPONENT_VULNERABILITIES_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const hubComponentRiskProfileMap = (state = {}, action) => {
    switch (action.type) {
        case HUB_COMPONENT_RISK_PROFILE_SET:
            return Object.assign({}, state, action.hubComponentRiskProfileMap);
        case HUB_COMPONENT_RISK_PROFILE_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};
