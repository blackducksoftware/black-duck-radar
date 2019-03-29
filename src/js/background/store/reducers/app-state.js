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
    CHROME_EXTENSION_DETAILS_SET,
    FRAME_VISIBILITY_DELETE,
    FRAME_VISIBILITY_TOGGLE,
    LOAD_STATE_DELETE,
    LOAD_STATE_SET,
    MENU_ITEM_SELECT,
    MENU_STATE_DELETE
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
