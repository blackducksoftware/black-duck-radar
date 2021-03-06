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

import parserDefinitions from './forge-parsers/parser-definitions';
import DomForgeParser from './forge-parsers/dom-forge-parser';
import WebFilePathParser from './forge-parsers/web-path-parser';
import MavenParser from './forge-parsers/maven-parser';
import ArtifactoryForgeParser from "./forge-parsers/artifactory-parser";

class ForgeLookup {
    constructor() {
    }

    async loadData() {
        if(USE_DEV_DEFINITIONS) {
            if(DEBUG_AJAX) {
                console.log("ForgeLookup.loadData() using development definitions");
            }
            return parserDefinitions;
        }

        const productionUrl = 'https://blackducksoftware.github.io/black-duck-radar/parser-definitions.json';
        const response = await fetch(productionUrl, {credentials: "include"});
        if (response.ok) {
            const body = await response.json()
                .catch(err => {
                    console.warn("ForgeLookup.loadData() error getting definitions ", err);
                    return parserDefinitions;
                });
            return body;
        } else {
            if(DEBUG_AJAX) {
                console.log("ForgeLookup.loadData() failed to load definitions (%s) - %s", response.status, response.statusText);
            }
        }

        if(DEBUG_AJAX) {
            console.log("ForgeLookup.loadData() using development definitions");
        }
        return parserDefinitions;
    }

    async buildMap({artifactoryUrl}) {
        const data = await this.loadData();
        if(DEBUG_AJAX) {
            console.log("ForgeLookup.buildMap() - Definitions Data: ", JSON.stringify(data, null, 2));
        }
        let parserEntries = data.definitions
            .filter(definition => definition.type !== 'ARTIFACTORY')
            .map(definition => [definition.site, definition]);
        if(artifactoryUrl) {
            const artifactoryServerUrl = new URL(artifactoryUrl);
            const artifactoryDefinition = data.definitions
                .filter(definition => definition.type === 'ARTIFACTORY')
                .map(definition => [artifactoryServerUrl.hostname, definition]);
            parserEntries = parserEntries.concat(artifactoryDefinition);
        }

        if(DEBUG_AJAX) {
            console.log("ForgeLookup.buildMap() - parserMap %s", JSON.stringify(this.parserMap,null,2));
        }

        this.parserMap = new Map(parserEntries);
    }

    getForgeParser(opts) {
        if (opts && opts.url && opts.url.length > 0) {
            const parsedUrl = new URL(opts.url);
            const { hostname } = parsedUrl;
            if (this.parserMap) {
                const definition = this.parserMap.get(hostname);
                if (definition) {
                    const props = Object.assign({}, definition, opts, { url: parsedUrl });
                    switch (definition.type) {
                        case 'DOM':
                            return new DomForgeParser(props);
                        case 'MAVEN':
                            return new MavenParser(props);
                        case 'WEB_PATH':
                            return new WebFilePathParser(props);
                        case 'ARTIFACTORY':
                            return new ArtifactoryForgeParser(props);
                        default:
                            return null;
                    }
                }
            }
        }
        return null;
    }
}

export default ForgeLookup;
