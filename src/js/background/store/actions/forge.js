import {
    FORGE_COMPONENT_KEYS_SET,
    FORGE_COMPONENT_KEYS_DELETE
} from './types';

export const setForgeComponentKeys = ({ tabId, componentKeys }) => {
    return {
        type: FORGE_COMPONENT_KEYS_SET,
        forgeComponentKeysMap: {
            [tabId]: componentKeys
        }
    };
};

export const deleteForgeComponentKeys = (tabId) => {
    return {
        type: FORGE_COMPONENT_KEYS_DELETE,
        tabId
    };
};
