import { combineReducers } from 'redux';

import {
    forgeComponentKeysMap
} from './background-state';

import {
    frameVisibilityMap,
    loadStateMap,
    menuStateMap,
    chromeExtensionDetails
} from './app-state';

import {
    blackduckOrigin,
    blackduckToken,
    blackduckBearerToken,
    hubUsername,
    blackduckConfiguredState,
    isHubLoginOpen
} from './hub/auth';

import {
    hubExternalComponentMap,
    hubComponentVersionMap,
    hubComponentVersionReferenceProjectsMap,
    hubProjectVersionComponentsMap,
    hubComponentPolicyRulesMap,
    hubComponentVulnerabilitiesMap,
    hubComponentRiskProfileMap
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
    chromeExtensionDetails
});

export default rootReducer;
