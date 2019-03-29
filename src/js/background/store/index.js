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

import { STORE_PORT } from 'shared/constants';
import middleware from './middleware';
import rootReducer from './reducers';
import { createStore as createReduxStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';

let store;

export const createStore = async () => {
    const initialState = {};
    store = createReduxStore(
        rootReducer,
        initialState,
        middleware
    );

    // Here we attach listeners to the store that allow the React apps
    // running in a content script to sync with store changes in the background
    wrapStore(store, { portName: STORE_PORT });

    if (DEBUG_REDUX) {
        store.subscribe(() => {
            console.log('redux state:', store.getState());
            console.log('\n');
        });
    }

    return store;
};

export const getState = (...keys) => {
    let value = store.getState();

    keys.every(key => {
        value = value[key];
        return value !== undefined;
    });

    return value;
};

export const dispatch = (action) => {
    return store.dispatch(action);
};
