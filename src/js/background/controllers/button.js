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

import Tabs from './tabs';

export default class Button {
    static async toggleGlow({ isEnabled, isDangerous, isPolicyViolated, isComponentPage, tabId }) {
        const tab = await Tabs.get(Number(tabId));
        if (tab) {
            let iconName;

            if (isDangerous) {
                iconName = 'duck_red';
            } else if (isPolicyViolated) {
                iconName = 'duck_orange';
            } else if (isEnabled) {
                iconName = 'duck_green';
            } else if (isComponentPage) {
                iconName = 'duck_unknown';
            } else {
                iconName = 'duck';
            }

            chrome.browserAction.setIcon({
                tabId: Number(tabId),
                path: `img/${iconName}.png`
            });
        }
    }

    static addOnClickListener(fn) {
        chrome.browserAction.onClicked.addListener(fn);
    }
}
