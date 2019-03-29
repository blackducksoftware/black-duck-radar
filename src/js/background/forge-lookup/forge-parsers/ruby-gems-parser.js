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

const packagesPath = '/gems/';

class RubyGemsParser extends ForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts, {
            forgeName: 'rubygems',
            forgeSeparator: '/',
            hubSeparator: '/'
        }));
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        const decodedPath = decodeURI(pathname);

        if (!decodedPath || !decodedPath.includes(packagesPath)) {
            return false;
        }

        const kbReleaseForgeId = decodedPath
            .replace(packagesPath, '')
            .replace('/versions', '');
        const [name, version] = kbReleaseForgeId.split(this.hubSeparator);

        if (!name || !version) {
            return false;
        }

        const hubExternalId = encodeURI(kbReleaseForgeId);

        return this.createComponentKeys({
            name,
            version,
            kbReleaseForgeId,
            hubExternalId
        });
    }
}

export default RubyGemsParser;
