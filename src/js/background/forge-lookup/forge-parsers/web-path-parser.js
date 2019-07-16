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

class WebFilePathParser extends ForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts));
        this.artifactPrefixPath = opts.artifactPrefixPath;
        this.artifactPrefixDelimeter = opts.artifactPrefixDelimeter;
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        const urlFragment = decodeURI(pathname);
        if (urlFragment.includes(this.artifactPrefixPath)) {
            return this.findArtifactDetails(urlFragment.replace(this.artifactPrefixPath, ''));
        }

        return null;
    }

    findArtifactDetails(urlFragment) {
        const fragmentArray = urlFragment.split('/');
        //expect ["artifact_prefix_1", "artifact_prefix_2", ..., "artifact_prefix_N", "artifact name","version",""]
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
                        .join(this.artifactPrefixDelimeter);
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

export default WebFilePathParser;
