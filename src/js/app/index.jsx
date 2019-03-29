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

import 'css/global';
import React from 'react';
import initialEntries from './history';
import { syncStore } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { HOST_ID } from 'shared/constants';
import AppContainer from './components/AppContainer';

// Initialize application
(async () => {
    const store = await syncStore();
    const host = document.getElementById(HOST_ID);

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <AppContainer />
            </MemoryRouter>
        </Provider>,
        host
    );
})();
