import {
    MENU_ITEM_SELECT,
    MENU_STATE_DELETE,
    FRAME_VISIBILITY_TOGGLE,
    FRAME_VISIBILITY_DELETE,
    LOAD_STATE_SET,
    LOAD_STATE_DELETE,
    CHROME_EXTENSION_DETAILS_SET
} from 'shared/actions/types';

export const frameVisibilityMap = (state = {}, action) => {
    if (DEBUG_REDUX) {
        console.log('redux ACTION:', action);
    }
    switch (action.type) {
        case FRAME_VISIBILITY_TOGGLE:
            return Object.assign({}, state, action.frameVisibilityMap);
        case FRAME_VISIBILITY_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const loadStateMap = (state = {}, action) => {
    switch (action.type) {
        case LOAD_STATE_SET:
            return Object.assign({}, state, action.loadStateMap);
        case LOAD_STATE_DELETE: {
            const { tabId } = action;
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const menuStateMap = (state = {}, action) => {
    const { tabId, type, menuState } = action;
    switch (type) {
        case MENU_ITEM_SELECT: {
            const currentState = state[tabId];
            const newState = Object.assign({}, currentState, menuState);
            return Object.assign({}, state, {
                [tabId]: newState
            });
        }
        case MENU_STATE_DELETE: {
            const newState = Object.assign({}, state);
            delete newState[tabId];
            return newState;
        }
        default:
            return state;
    }
};

export const chromeExtensionDetails = (state = {}, action) => {
    switch (action.type) {
        case CHROME_EXTENSION_DETAILS_SET:
            return Object.assign({}, state, action.chromeExtensionDetails);
        default:
            return state;
    }
};
