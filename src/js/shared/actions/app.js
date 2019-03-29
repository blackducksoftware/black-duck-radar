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

import { FRAME_VISIBILITY_DELETE, FRAME_VISIBILITY_TOGGLE, LOAD_STATE_DELETE, LOAD_STATE_SET, MENU_STATE_DELETE } from './types';

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
