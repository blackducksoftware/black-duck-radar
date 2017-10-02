import {
    LOAD_STATE_SET,
    LOAD_STATE_DELETE,
    FRAME_VISIBILITY_TOGGLE,
    FRAME_VISIBILITY_DELETE,
    MENU_STATE_DELETE
} from './types';

import { loadEnum } from 'shared/constants';

export const setLoadState = (tabId, loadState) => {
    return {
        type: LOAD_STATE_SET,
        loadStateMap: {
            [tabId]: {
                status: loadState,
                isLoaded: loadState === loadEnum.LOADED
            }
        }
    };
};

export const deleteLoadState = (tabId) => {
    return {
        type: LOAD_STATE_DELETE,
        tabId
    };
};

export const hideFrame = (tabId) => {
    return {
        type: FRAME_VISIBILITY_TOGGLE,
        frameVisibilityMap: {
            [tabId]: false
        }
    };
};

export const showFrame = (tabId) => {
    return {
        type: FRAME_VISIBILITY_TOGGLE,
        frameVisibilityMap: {
            [tabId]: true
        }
    };
};

export const deleteFrameVisibilityState = (tabId) => {
    return {
        type: FRAME_VISIBILITY_DELETE,
        tabId
    };
};

export const deleteMenuState = (tabId) => {
    return {
        type: MENU_STATE_DELETE,
        tabId
    };
};
