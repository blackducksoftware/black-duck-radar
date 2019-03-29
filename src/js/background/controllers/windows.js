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

export default class Windows {
    static create(opts) {
        return new Promise(resolve => {
            chrome.windows.create(opts, (props) => {
                resolve(props);
            });
        });
    }

    static addCloseListener(fn) {
        chrome.windows.onRemoved.addListener(fn);
    }

    static removeCloseListener(fn) {
        chrome.windows.onRemoved.removeListener(fn);
    }

    // Returns position for pop up centered within the 'parent' window
    static getCenteredPosition({
                                   width, height, parentHeight, parentWidth, parentTop, parentLeft
                               }) {
        const left = Math.floor((parentWidth / 2) - (width / 2) + parentLeft);
        const top = Math.floor((parentHeight / 2) - (height / 2) + parentTop);

        return {
            left,
            top
        };
    }
}
