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

import ForgeParser from './forge-parser';
import { buildParserScript } from 'scripts/parser';

class DomForgeParser extends ForgeParser {
    constructor(opts) {
        super(opts);
        this.nameQuery = opts.nameQuery;
        this.versionQuery = opts.versionQuery;
        this.tabId = opts.tabId;
    }

    getComponentText() {
        const code = buildParserScript({
            nameQuery: this.nameQuery,
            versionQuery: this.versionQuery
        });

        return new Promise((resolve, reject) => {
            const listener = (request, sender) => {
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    extensionId,
                    nameText,
                    versionText
                } = request;

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }
                chrome.runtime.onMessage.removeListener(listener);

                if (error) {
                    reject(new Error('Failed to fetch component text'));
                    return;
                }

                resolve({
                    nameText,
                    versionText
                });
            };

            chrome.runtime.onMessage.addListener(listener);
            chrome.tabs.executeScript(Number(this.tabId), { code });
        });
    }
}

export default DomForgeParser;
