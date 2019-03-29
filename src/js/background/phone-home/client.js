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

class PhoneHomeClient {
    phoneHome(phoneHomeRequestBody) {
        const parameters = this.createQueryParameters(phoneHomeRequestBody);
        return this.post('https://www.google-analytics.com/collect', {
            fetchOpts: {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: parameters
            }
        });
    }

    createQueryParameters(phoneHomeRequestBody) {
        const keys = Object.keys(phoneHomeRequestBody);
        const params = [];
        keys.forEach(key => {
            const parameter = `${encodeURI(key)}=${encodeURI(phoneHomeRequestBody[key])}`;
            params.push(parameter);
        });
        return params.join('&');
    }

    post(baseUrl, { fetchOpts } = {}) {
        const url = new URL(baseUrl);
        const opts = Object.assign({
            method: 'POST'
        }, fetchOpts);

        return this.fetch(url, opts);
    }

    async fetch(url, _opts) {
        const opts = Object.assign({
            credentials: 'include'
        }, _opts);

        if (DEBUG_AJAX) {
            console.log(`Make Phone Home ${opts.method} request:`, url.toString());
        }

        const response = await fetch(url, opts);
        const body = await response.json()
            .catch(() => null);

        if (!response.ok) {
            if (DEBUG_AJAX) {
                console.warn(`Phone Home ${opts.method} request failed:`, url.toString());
                console.log('\n');
            }
            throw new Error(body.errorMessage);
        }

        if (DEBUG_AJAX) {
            console.log(`Phone Home ${opts.method} request completed:`, response.url);
            console.log(`Phone Home ${opts.method} request status:`, response.status);
            console.log('\n');
        }

        return body;
    }
}

export default PhoneHomeClient;
