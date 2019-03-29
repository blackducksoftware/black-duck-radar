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

import { Store } from 'react-chrome-redux';
import { STORE_PORT } from 'shared/constants';

const store = new Store({
    portName: STORE_PORT
});

export const syncStore = async () => {
    // Connect to the background store
    await store.ready();

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
    store.dispatch(action);
};
