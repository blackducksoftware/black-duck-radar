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

import DomForgeParser from './dom-forge-parser';

const packagesPath = '/gems/';

class RubyGemsParser extends DomForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts, {
            forgeName: 'rubygems',
            forgeSeparator: '/',
            hubSeparator: '/',
            nameQuery: 'div.l-wrap--b h1.t-display',
            versionQuery: 'div.l-wrap--b h1.t-display i.page__subheading'
        }));
    }

    async getComponentKeys() {
        const componentText = await this.getComponentText();
        if (componentText.nameText) {
            const nameVersionArray = componentText.nameText.split(' ');
            const [name, version] = nameVersionArray;
            const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
            const hubExternalId = encodeURI(kbReleaseForgeId);
            return this.createComponentKeys({
                name,
                version,
                kbReleaseForgeId,
                hubExternalId
            });
        }
    }
}

export default RubyGemsParser;
