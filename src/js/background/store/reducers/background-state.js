import {
    FORGE_COMPONENT_KEYS_SET,
    FORGE_COMPONENT_KEYS_DELETE
} from '../actions/types';

export const forgeComponentKeysMap = (state = {}, action) => {
    switch (action.type) {
        case FORGE_COMPONENT_KEYS_SET:
            return Object.assign({}, state, action.forgeComponentKeysMap);
        case FORGE_COMPONENT_KEYS_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};
