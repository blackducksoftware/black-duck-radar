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

import MavenParser from './maven-parser';

class RepoMavenCentralParser extends MavenParser {
    constructor(opts) {
        super(Object.assign({}, opts, { artifactComponent: '/maven2/' }));
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        return super.getComponentKeys(decodeURI(pathname));
    }

    findGavByArtifactDetails(urlFragment) {
        console.log('repo maven', urlFragment);
        const fragmentArray = urlFragment.split('/');
        if (fragmentArray && fragmentArray.length > 3) {
            const length = fragmentArray.length;
            const version = fragmentArray[length - 2];
            if (version) {
                const artifact = fragmentArray[length - 3];
                let group = '';
                if (length === 4) {
                    group = fragmentArray[0];
                } else {
                    group = fragmentArray.slice(0, length - 3)
                        .join('.');
                }
                const name = [group, artifact].join(this.forgeSeparator);
                if (!name || !version) {
                    return false;
                }

                const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
                const hubExternalId = encodeURI([group, artifact, version].join(this.blackDuckSeparator));

                return this.createComponentKeys({
                    name,
                    version,
                    kbReleaseForgeId,
                    hubExternalId
                });
            }
            return false;
        }
        return false;
    }
}

export default RepoMavenCentralParser;
