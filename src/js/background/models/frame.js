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

import * as store from '../store';
import { load, unload } from '../store/actions/app';
import { hideFrame, showFrame } from 'shared/actions/app';
import { loadEnum } from 'shared/constants';

class Frame {
    constructor({ url, id }) {
        this.tabId = id;
        this.tabUrl = url;
    }

    toggleVisibility() {
        const isVisible = store.getState('frameVisibilityMap', this.tabId);
        const action = isVisible ? hideFrame(this.tabId) : showFrame(this.tabId);
        return store.dispatch(action);
    }

    hideFrame() {
        return store.dispatch(hideFrame(this.tabId));
    }

    unload() {
        const { tabId } = this;
        return store.dispatch(unload({ tabId }));
    }

    load() {
        const { tabId, tabUrl } = this;
        const componentKeys = store.getState('forgeComponentKeysMap', tabUrl);
        return store.dispatch(load({
            tabId,
            componentKeys
        }));
    }

    isInserted() {
        const { status } = store.getState('loadStateMap', this.tabId) || {};
        return status === loadEnum.LOADED || status === loadEnum.LOADING;
    }
}

export default Frame;
