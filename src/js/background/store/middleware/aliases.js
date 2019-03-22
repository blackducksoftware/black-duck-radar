import {
    syncHubExternalComponent,
    syncHubComponentVersion,
    syncHubComponentVersionReferenceProjects,
    syncHubProjectVersionComponents,
    syncHubComponentPolicyRules,
    syncHubComponentRiskProfile,
    syncHubComponentVulnerabilities,
    refreshComponent
} from '../actions/hub-component';

import {
    performHubLogin,
    performHubLogout,
    openHubLoginWindow
} from '../actions/hub-auth';

import { displayOptionsPage, unload, updateExtensionIcon } from '../actions/app';

import {
    APP_UNLOAD,
    BLACKDUCK_CONFIGURED_CHECK,
    HUB_LOGIN,
    HUB_LOGOUT,
    HUB_EXTERNAL_COMPONENT_SYNC,
    HUB_COMPONENT_VERSION_SYNC,
    HUB_COMPONENT_VERSION_REFERENCE_PROJECTS_SYNC,
    HUB_PROJECT_VERSION_COMPONENTS_SYNC,
    HUB_COMPONENT_POLICIES_SYNC,
    HUB_COMPONENT_VULNERABILITIES_SYNC,
    HUB_COMPONENT_RISK_PROFILE_SYNC,
    HUB_LOGIN_WINDOW_OPEN,
    HUB_COMPONENT_REFRESH,
    DISPLAY_OPTIONS_PAGE,
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
