import PersistentStorage from '../persistent-storage';
import * as store from 'background/store';
import Hub from 'background/controllers/hub';
import Button from 'background/controllers/button';
import { SYNC_PENDING } from 'shared/constants';

import {
    HUB_EXTERNAL_COMPONENT_SET,
    HUB_COMPONENT_VERSION_SET,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SET,
    HUB_PROJECT_VERSION_COMPONENTS_SET,
    HUB_COMPONENT_POLICIES_SET,
    HUB_COMPONENT_VULNERABILITIES_SET,
    HUB_COMPONENT_RISK_PROFILE_SET,
    HUB_EXTERNAL_COMPONENT_DELETE,
    HUB_COMPONENT_VERSION_DELETE,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_DELETE,
    HUB_PROJECT_VERSION_COMPONENTS_DELETE,
    HUB_COMPONENT_POLICIES_DELETE,
    HUB_COMPONENT_VULNERABILITIES_DELETE,
    HUB_COMPONENT_RISK_PROFILE_DELETE
} from 'shared/actions/types';

const hubController = new Hub();

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

        dispatch(setHubExternalComponent(tabId, SYNC_PENDING));

        const componentKeys = store.getState('forgeComponentKeysMap', tabId);
        const externalComponents = await hubController.getExternalComponents(componentKeys);
        const component = externalComponents.pop() || null;

        if (component) {
            const urlParts = component.version.split('/');
            component.releaseId = urlParts.pop();
            urlParts.pop();
            component.projectId = urlParts.pop();
        }

        dispatch(setHubExternalComponent(tabId, component));

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

        dispatch(setHubComponentVersion(tabId, SYNC_PENDING));
        const componentVersion = await hubController.getComponentVersion(externalComponent);
        dispatch(setHubComponentVersion(tabId, componentVersion));

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

        dispatch(setHubComponentVersionReferenceProjects(tabId, SYNC_PENDING));
        const referenceProjects = await hubController.getComponentVersionReferenceProjects(componentVersion);
        dispatch(setHubComponentVersionReferenceProjects(tabId, referenceProjects));
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

        dispatch(setHubProjectVersionComponents(tabId, SYNC_PENDING));
        const projectVersionComponents = await hubController.getMatchingBOMComponents(externalComponent, referenceProjects);
        dispatch(setHubProjectVersionComponents(tabId, projectVersionComponents));
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

        dispatch(setHubComponentVulnerabilities(tabId, SYNC_PENDING));
        const vulnerabilities = await hubController.getComponentVulnerabilities(componentVersion);
        // policies is an array of arrays, concat is just flattening them
        dispatch(setHubComponentVulnerabilities(tabId, vulnerabilities));

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

        dispatch(setHubComponentRiskProfile(tabId, SYNC_PENDING));
        const riskProfile = await hubController.getComponentRiskProfile(componentVersion);
        dispatch(setHubComponentRiskProfile(tabId, riskProfile));
    };
};

export const deleteHubComponentRiskProfile = (tabId) => {
    return {
        type: HUB_COMPONENT_RISK_PROFILE_DELETE,
        tabId
    };
};

export const syncHubExternalVulnerabilities = ({ tabId }) => {
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

        Button.toggleGlow({
            isEnabled: Boolean(externalComponent),
            isDangerous: Boolean(vulnerabilities && vulnerabilities.length),
            tabId
        });
    };
};

export const refreshComponent = ({ tabId }) => {
    return async (dispatch) => {
        dispatch(syncHubExternalVulnerabilities({ tabId }));
    };
};

export const checkPhoneHomeDate = (currentPhoneHomeData) => {
    if (!currentPhoneHomeData) {
        return true;
    }

    const { lastUpdated } = currentPhoneHomeData;

    if (!lastUpdated) {
        return true;
    }
    const currentDate = Date.now();
    const lastUpdatedDate = Date.parse(lastUpdated);
    return currentDate.year !== lastUpdatedDate.year
        && currentDate.monthIndex !== lastUpdatedDate.monthIndex
        && currentDate.day !== lastUpdatedDate.day;
};

export const checkForgeMap = (tabId) => {
    const forgeComponentKeysMap = store.getState('forgeComponentKeysMap');
    if (tabId && tabId.toString() in forgeComponentKeysMap) {
        return true;
    }
    return false;
};

export const performPhoneHome = ({ visitedUrl, tabId }) => {
    return async () => {
        try {
            const { phoneHomeData } = await PersistentStorage.getState();
            const shouldPhoneHome = checkPhoneHomeDate(phoneHomeData) && checkForgeMap(tabId);
            if (shouldPhoneHome) {
                const extensionDetails = store.getState('chromeExtensionDetails');
                const { version } = extensionDetails;
                const visitedOrigin = new URL(visitedUrl).origin;
                console.log("visitedUrl ", visitedOrigin);
                await hubController.phoneHome('Radar', version, version);
                const newPhoneHomeData = {
                    phoneHomeData: {
                        lastUpdated: Date.now().toString()
                    }
                };
                console.log("phone home data to save ", newPhoneHomeData);
                PersistentStorage.setState(newPhoneHomeData);
            }
        } catch (err) {
            if (DEBUG_AJAX) {
                console.log('Phone home failed: ', err);
            }
        }
    };
};
