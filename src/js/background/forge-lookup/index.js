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

import parserMap from './forge-parsers/parser-map';
import parserDefinitions from './parser-definitions';
import DomForgeParser from './forge-parsers/dom-forge-parser';

class ForgeLookup {
    constructor() {
        this.buildMap();
    }

    buildMap() {
        const parserTuples = Object.keys(parserMap)
            .map(key => [key, parserMap[key]]);
        const parserEntries = parserDefinitions.definitions.map(item => [item.url, item]);
        this.parserMap = new Map(parserEntries.concat(parserTuples));
    }

    getForgeParser(opts) {
        const parsedUrl = new URL(opts.url);
        const { hostname } = parsedUrl;
        const definition = this.parserMap.get(hostname);
        if (definition && definition.type === 'DOM') {
            return new DomForgeParser(Object.assign({}, definition, opts, { url: parsedUrl }));
        }

        return null;
    }
}

export default ForgeLookup;
