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

import { app as appClass, appHeader } from 'css/app';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import MenuContainer from './menu/MenuContainer';
import ProfileContainer from './profile/ProfileContainer';
import HelpContainer from './help/HelpContainer';
import LoginStatusContainer from './login/LoginStatusContainer';
import { Route } from 'react-router';

const App = () => {
    return (
        <div className={appClass}>
            <Logo />
            <div className={appHeader}>
                <MenuContainer />
                <LoginStatusContainer />
            </div>
            <Route path='/profile' component={ProfileContainer} />
            <Route path='/help' component={HelpContainer} />
        </div>
    );
};

App.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object
};

export default App;
