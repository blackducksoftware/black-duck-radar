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
import * as store from 'background/store';
import Hub from 'background/controllers/hub';
import Button from 'background/controllers/button';
import { SYNC_PENDING } from 'shared/constants';

import {
    FETCHING_DATA,
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

const hubController = new Hub();

export const setFetchingData = (tabId, value) => {
    return {
        type: FETCHING_DATA,
        fetchingData: {
            [tabId]: value
        }
    };
};

export const setHubExternalComponent = (tabId, value) => {
    return {
        type: HUB_EXTERNAL_COMPONENT_SET,
        hubExternalComponentMap: {
            [tabId]: value
        }
    };
};

export const setHubComponentVersion = (tabId, value) => {
    return {
        type: HUB_COMPONENT_VERSION_SET,
        hubComponentVersionMap: {
            [tabId]: value
        }
    };
};

export const setHubProjectVersionComponents = (tabId, value) => {
    return {
        type: HUB_PROJECT_VERSION_COMPONENTS_SET,
        hubProjectVersionComponentsMap: {
            [tabId]: value
        }
    };
};

export const setHubComponentVersionReferenceProjects = (tabId, value) => {
    return {
        type: HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SET,
        hubComponentVersionReferenceProjectsMap: {
            [tabId]: value
        }
    };
};

export const setHubComponentPolicyRules = (tabId, value) => {
    return {
        type: HUB_COMPONENT_POLICIES_SET,
        hubComponentPolicyRulesMap: {
            [tabId]: value
        }
    };
};

export const setHubComponentVulnerabilities = (tabId, value) => {
    return {
        type: HUB_COMPONENT_VULNERABILITIES_SET,
        hubComponentVulnerabilitiesMap: {
            [tabId]: value
        }
    };
};

export const setHubComponentRiskProfile = (tabId, value) => {
    return {
        type: HUB_COMPONENT_RISK_PROFILE_SET,
        hubComponentRiskProfileMap: {
            [tabId]: value
        }
    };
};

export const syncHubExternalComponent = ({ tabId }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubExternalComponentMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubExternalComponent(tabId, SYNC_PENDING));

        const componentKeys = store.getState('forgeComponentKeysMap', tabId) || {};
        const externalComponents = await hubController.getExternalComponents(componentKeys);
        const component = externalComponents.pop() || null;
        if (component) {
            const urlParts = component.version.split('/');
            component.releaseId = urlParts.pop();
            urlParts.pop();
            component.projectId = urlParts.pop();
        }

        dispatch(setHubExternalComponent(tabId, component));
        dispatch(setFetchingData(tabId,false));
        return component;
    };
};

export const deleteHubExternalComponent = (tabId) => {
    return {
        type: HUB_EXTERNAL_COMPONENT_DELETE,
        tabId
    };
};

export const syncHubComponentVersion = ({ tabId, externalComponent }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubComponentVersionMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubComponentVersion(tabId, SYNC_PENDING));
        const componentVersion = await hubController.getComponentVersion(externalComponent);
        dispatch(setHubComponentVersion(tabId, componentVersion));
        dispatch(setFetchingData(tabId,false));
        return componentVersion;
    };
};

export const deleteHubComponentVersion = (tabId) => {
    return {
        type: HUB_COMPONENT_VERSION_DELETE,
        tabId
    };
};

export const syncHubComponentVersionReferenceProjects = ({ tabId, componentVersion }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubComponentVersionReferenceProjectsMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubComponentVersionReferenceProjects(tabId, SYNC_PENDING));
        const referenceProjects = await hubController.getComponentVersionReferenceProjects(componentVersion);
        dispatch(setHubComponentVersionReferenceProjects(tabId, referenceProjects));
        dispatch(setFetchingData(tabId,false));
        return referenceProjects;
    };
};

export const deleteHubComponentVersionReferenceProjects = (tabId) => {
    return {
        type: HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_DELETE,
        tabId
    };
};

export const syncHubProjectVersionComponents = ({ tabId, externalComponent, referenceProjects }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubProjectVersionComponentsMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubProjectVersionComponents(tabId, SYNC_PENDING));
        const projectVersionComponents = await hubController.getMatchingBOMComponents(externalComponent, referenceProjects);
        dispatch(setHubProjectVersionComponents(tabId, projectVersionComponents));
        dispatch(setFetchingData(tabId,false));
        return projectVersionComponents;
    };
};

export const deleteHubProjectVersionComponents = (tabId) => {
    return {
        type: HUB_PROJECT_VERSION_COMPONENTS_DELETE,
        tabId
    };
};

export const syncHubComponentPolicyRules = ({ tabId, projectVersionComponents }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubComponentPolicyRulesMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubComponentPolicyRules(tabId, SYNC_PENDING));
        const projectVersionsWithViolations = projectVersionComponents.filter(component => {
            const hasPolicyViolation = component.policyStatus && component.policyStatus === 'IN_VIOLATION';
            return hasPolicyViolation;
        });
        const policies = await Promise.all(projectVersionsWithViolations.map(component => {
            return hubController.getComponentPolicyViolations(component);
        }));
        // remove duplicates
        const flatPolicyArray = Array.prototype.concat.apply([], policies);
        const visitedItems = {};
        const filteredPolicyList = flatPolicyArray.filter(item => {
            const alreadyIncluded = visitedItems.hasOwnProperty(item.name) ? false : (visitedItems[item.name] = true);
            return alreadyIncluded;
        });
        // policies is an array of arrays, concat is just flattening them
        dispatch(setHubComponentPolicyRules(tabId, filteredPolicyList));
        dispatch(setFetchingData(tabId,false));
        return filteredPolicyList;
    };
};

export const deleteHubComponentPolicyRules = (tabId) => {
    return {
        type: HUB_COMPONENT_POLICIES_DELETE,
        tabId
    };
};

export const syncHubComponentVulnerabilities = ({ tabId, componentVersion }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubComponentVulnerabilitiesMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }
        dispatch(setFetchingData(tabId,true));
        dispatch(setHubComponentVulnerabilities(tabId, SYNC_PENDING));
        const vulnerabilities = await hubController.getComponentVulnerabilities(componentVersion);
        // policies is an array of arrays, concat is just flattening them
        dispatch(setHubComponentVulnerabilities(tabId, vulnerabilities));
        dispatch(setFetchingData(tabId,false));
        return vulnerabilities;
    };
};

export const deleteHubComponentVulnerabilities = (tabId) => {
    return {
        type: HUB_COMPONENT_VULNERABILITIES_DELETE,
        tabId
    };
};

export const syncHubComponentRiskProfile = ({ tabId, componentVersion }) => {
    return async (dispatch) => {
        const currentValue = store.getState('hubComponentRiskProfileMap', tabId);

        if (currentValue === SYNC_PENDING) {
            // We're currently syncing this value
            return;
        }

        dispatch(setFetchingData(tabId,true));
        dispatch(setHubComponentRiskProfile(tabId, SYNC_PENDING));
        const riskProfile = await hubController.getComponentRiskProfile(componentVersion);
        dispatch(setHubComponentRiskProfile(tabId, riskProfile));
        dispatch(setFetchingData(tabId,false));
    };
};

export const deleteHubComponentRiskProfile = (tabId) => {
    return {
        type: HUB_COMPONENT_RISK_PROFILE_DELETE,
        tabId
    };
};

export const updateIcon = ({ tabId }) => {
    return async (dispatch) => {
        const externalComponent = await dispatch(syncHubExternalComponent({ tabId }));
        const componentVersion = externalComponent && await dispatch(syncHubComponentVersion({
            tabId,
            externalComponent
        }));
        const vulnerabilities = componentVersion && await dispatch(syncHubComponentVulnerabilities({
            tabId,
            componentVersion
        }));

        if (vulnerabilities && vulnerabilities.length) {
            Button.toggleGlow({
                isEnabled: Boolean(externalComponent),
                isDangerous: true,
                tabId
            });
        } else {
            const referenceProjects = componentVersion && await dispatch(syncHubComponentVersionReferenceProjects({
                tabId,
                componentVersion
            }));
            const projectVersionComponents = referenceProjects && await dispatch(syncHubProjectVersionComponents({
                tabId,
                externalComponent,
                referenceProjects
            }));
            const policyList = projectVersionComponents && await dispatch(syncHubComponentPolicyRules({
                tabId,
                projectVersionComponents
            }));

            const componentKeys = store.getState('forgeComponentKeysMap', tabId);

            Button.toggleGlow({
                isEnabled: Boolean(externalComponent),
                isDangerous: false,
                isPolicyViolated: Boolean(policyList && policyList.length),
                isComponentPage: Boolean(componentKeys),
                tabId
            });
        }
    };
};

export const refreshComponent = ({ tabId }) => {
    return async (dispatch) => {
        try {
            dispatch(updateIcon({ tabId }));
        } catch (err) {

        }
    };
};

export const isPhoneHomeNeeded = (currentPhoneHomeData) => {
    // no data collected
    if (!currentPhoneHomeData) {
        return false;
    }

    const { lastUpdated, forgeNames } = currentPhoneHomeData;
    // no forge data collected
    if (!forgeNames) {
        return false;
    }
    const origin = hubController.getOrigin();
    const token = hubController.getToken();
    // extension not configured can't get blackduck version data
    if (!origin || origin === '') {
        return false;
    }

    if (!token || token === '') {
        return false;
    }
    // data collected but never sent
    if (!lastUpdated) {
        return true;
    }
    // data collected and previously sent.
    // Is it a new day to send data again? Only send once a day.
    const currentDate = Date.now();
    const lastUpdatedDate = Date.parse(lastUpdated);
    return currentDate.year !== lastUpdatedDate.year
        && currentDate.monthIndex !== lastUpdatedDate.monthIndex
        && currentDate.day !== lastUpdatedDate.day;
};

export const isForgeToBeAdded = (phoneHomeData, forgeName) => {
    if (!phoneHomeData) {
        return true;
    }
    const lastForgeNames = phoneHomeData.forgeNames;
    if (!lastForgeNames) {
        return true;
    }
    return lastForgeNames.indexOf(forgeName) < 0;
};

export const getForgeName = (tabId, forgeComponentKeysMap) => {
    if (tabId && tabId.toString() in forgeComponentKeysMap) {
        return forgeComponentKeysMap[tabId].forgeName;
    }
    return null;
};

export const collectForgeData = (tabId, phoneHomeData) => {
    const forgeComponentKeysMap = store.getState('forgeComponentKeysMap');
    const currentForgeName = getForgeName(tabId, forgeComponentKeysMap);
    const phoneHomeDataChanged = currentForgeName !== null
        && isForgeToBeAdded(phoneHomeData, currentForgeName);
    if (phoneHomeDataChanged) {
        let forges = [];
        forges.push(currentForgeName);
        let lastUpdated;
        if (phoneHomeData) {
            forges = forges.concat(phoneHomeData.forgeNames);
            lastUpdated = phoneHomeData.lastUpdated;
        }
        const newPhoneHomeData = {
            phoneHomeData: {
                lastUpdated,
                forgeNames: forges
            }
        };
        PersistentStorage.setState(newPhoneHomeData);
    }
};

export const performPhoneHomeIfNeeded = () => {
    return async () => {
        try {
            const { phoneHomeData } = await PersistentStorage.getState();
            const shouldPhoneHome = isPhoneHomeNeeded(phoneHomeData);
            if (shouldPhoneHome) {
                const extensionDetails = store.getState('chromeExtensionDetails');
                const { version } = extensionDetails;
                const metaData = {
                    forges: phoneHomeData.forgeNames
                };
                await hubController.phoneHome(version, metaData);
                // update the last update time and reset the forge data.
                const newPhoneHomeData = {
                    phoneHomeData: {
                        lastUpdated: Date.now()
                            .toString(),
                        forgeNames: []
                    }
                };
                await PersistentStorage.setState(newPhoneHomeData);
            }
        } catch (err) {
            if (DEBUG_AJAX) {
                console.log('Phone home failed: ', err);
            }
        }
    };
};

export const collectUsageData = ({ tabId }) => {
    return async () => {
        try {
            const { phoneHomeData } = await PersistentStorage.getState();
            collectForgeData(tabId, phoneHomeData);
        } catch (err) {
            if (DEBUG_AJAX) {
                console.log('Phone home failed: ', err);
            }
        }
    };
};
