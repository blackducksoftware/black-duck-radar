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

class ForgeParser {
    constructor({ forgeName, forgeSeparator, hubSeparator, url }) {
        this.forgeName = forgeName;
        this.forgeSeparator = forgeSeparator;
        this.hubSeparator = hubSeparator;
        this.forgeUrl = url;
    }

    getComponentKeys() {
        console.warn('getComponentKeys should be overridden.');
        return false;
    }

    createComponentKeys(data = {}) {
        return Object.assign({
            forgeName: this.forgeName,
            // We use the hub external id to map API responses
            // to the correct React application
            internal: data.hubExternalId
        }, data);
    }
}

export default ForgeParser;
