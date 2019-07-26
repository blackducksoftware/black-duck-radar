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
        this.nameHasVersion = opts.nameHasVersion;
        this.nameVersionDelimeter = opts.nameVersionDelimeter;
        this.nameQuery = opts.nameQuery;
        this.versionQuery = opts.versionQuery;
        this.tabId = opts.tabId;

    }

    getComponentText(queryObject) {
        const code = buildParserScript(queryObject);

        return new Promise((resolve, reject) => {
            const listener = (request, sender) => {
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    nameElementMissing,
                    versionElementMissing,
                    extensionId,
                    nameText,
                    versionText
                } = request;

                if(DEBUG_AJAX) {
                    console.log("DOM FORGE PARSER - Parser script request: ",request);
                }

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }
                chrome.runtime.onMessage.removeListener(listener);

                if (error) {
                    const message = `Failed to fetch component text, nameMissing: ${nameElementMissing}, versionMissing: ${versionElementMissing}`;
                    if(DEBUG_AJAX) {
                        console.log(message);
                    }
                    reject(new Error(message));
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

    async getComponentKeys() {
        const queryObject = {
            nameQuery: this.nameQuery,
            versionQuery: this.versionQuery
        };
        const componentText = await this.getComponentText(queryObject);
        if (DEBUG_AJAX) {
            console.log('DOM FORGE PARSER: %s - parsed component text %s', this.forgeName, JSON.stringify(componentText));
        }
        let name = componentText.nameText;
        let version = componentText.versionText;
        if (name) {
            if (this.nameHasVersion) {
                const nameVersionArray = componentText.nameText.split(this.nameVersionDelimeter);
                const [artifactName, artifactVersion] = nameVersionArray;
                name = artifactName.trim();
                version = artifactVersion.trim();
            }

            const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
            const hubExternalId = encodeURI([name, version].join(this.blackDuckSeparator));
            if (DEBUG_AJAX) {
                console.log('DOM FORGE PARSER: %s - name: %s, version: %s, kbID: %s, externalID: %s', this.forgeName, name, version, kbReleaseForgeId, hubExternalId);
            }
            return this.createComponentKeys({
                name,
                version,
                kbReleaseForgeId,
                hubExternalId
            });
        }
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}

export default DomForgeParser;
