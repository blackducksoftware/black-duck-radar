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

import * as store from '../store';
import HateoasModel from '../models/hateoas-model';
import Permissions from './permissions';
import PhoneHomeRequestBodyBuilder from '../phone-home/builder';
import PhoneHomeClient from '../phone-home/client';
import { PHONE_HOME_PRODUCT_ENUM } from '../../shared/constants';

class Hub {
    getOrigin() {
        return store.getState('blackduckOrigin') || '';
    }

    getToken() {
        return store.getState('blackduckToken') || '';
    }

    getBearerToken() {
        return store.getState('blackduckBearerToken') || '';
    }

    async login({ username, password }) {
        const origin = this.getOrigin();

        if (!origin) {
            throw new Error('No Hub origin saved');
        }

        // This permissions request will throw if it fails
        await Permissions.requestUrl(origin);

        return this.post('/j_spring_security_check', {
            fetchOpts: {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: `j_username=${username}&j_password=${password}`
            }
        });
    }

    logout() {
        return this.get('/j_spring_security_logout');
    }

    async tokenAuthentication() {
        return this.requestBearerToken({ blackduckToken: this.getToken() });
    }

    async requestBearerToken({ blackduckToken }) {
        let currentBearerToken = this.getBearerToken();
        if (currentBearerToken) {
            try {
                await this.getHubVersion();
            } catch (err) {
                currentBearerToken = null;
            }
        }

        if (!currentBearerToken) {
            const url = this.getRequestUrl('/api/tokens/authenticate', {});
            const headers = {
                Authorization: `token ${blackduckToken}`
            };
            const opts = {
                credentials: 'include',
                method: 'POST',
                headers
            };
            const response = await fetch(url, opts);
            const body = await response.json()
                .catch(() => null);
            if (body) {
                currentBearerToken = body.bearerToken;
            }
        }
        return currentBearerToken;
    }

    async isConnected() {
        const response = await this.getCurrentUser();
        return Boolean(response);
    }

    getCurrentUser() {
        return this.get('/api/v1/currentuser')
            .catch(() => null);
    }

    /*
     * @param {ComponentKeys}
     * */
    async getExternalComponents({ forgeName, hubExternalId } = {}) {
        let response = null;
        if (forgeName && hubExternalId) {
            response = await this.get('/api/components', {
                queryMap: {
                    q: `${forgeName}:${hubExternalId}`
                }
            })
                .catch(() => null);
        }

        if (response) {
            return response.items;
        }

        return [];
    }

    /*
     * @param {ExternalComponent}
     * */
    getComponentVersion({ version: versionUrl } = {}) {
        return this.get(versionUrl);
    }

    /*
     * @param {ComponentVersion}
     * Returns the project versions that contain this component in their BOM
     * */
    async getComponentVersionReferenceProjects(componentVersion) {
        const references = await this.getComponentVersionReferences(componentVersion);
        return Promise.all(references.map(this.getReferenceProjectVersion.bind(this)));
    }

    async getComponentVersionReferences(componentVersion) {
        return this.getListRelation(componentVersion, 'references');
    }

    /*
    * @param {ProjectReference}
    * */
    async getReferenceProjectVersion({ projectName, projectVersionUrl } = {}) {
        const projectVersion = await this.get(projectVersionUrl)
            .catch(() => null);

        if (projectVersion) {
            projectVersion.projectName = projectName;
        }

        return projectVersion;
    }

    /*
     * @param {ExternalComponent}
     * @param {ProjectVersion[]}
     * Returns an array of components, one from each project's BOM that match the external component
     * */
    async getMatchingBOMComponents({ version }, projectVersions) {
        return Promise.all(projectVersions.map(async (projectVersion) => {
            const bomComponents = await this.getProjectVersionComponents(projectVersion);
            return bomComponents.filter(({ componentVersion }) => componentVersion === version);
        }))
            .then(componentArrays => Array.prototype.concat.apply([], componentArrays));
    }

    getComponentPolicyViolations(bomComponent) {
        return this.getListRelation(bomComponent, 'policy-rules');
    }

    /*
     * @param {ProjectVersion}
     * */
    getProjectVersionComponents(projectVersion) {
        return this.getListRelation(projectVersion, 'components');
    }

    async getComponentVulnerabilities(componentVersion) {
        const vulnerabilities = await this.getListRelation(componentVersion, 'vulnerabilities');
        return vulnerabilities.map(vulnerability => {
            let detailsUrl = '';

            if (vulnerability.source === 'NVD') {
                detailsUrl = `https://web.nvd.nist.gov/view/vuln/search-results?query=${vulnerability.vulnerabilityName}&search_type=all&cves=on`;
            } else if (vulnerability.source === 'VULNDB') {
                detailsUrl = `${this.getOrigin()}/#vulnerabilities/id:${vulnerability.vulnerabilityName}/view:overview`;
            } else if (vulnerability.source === 'BDSA') {
                detailsUrl = `${this.getOrigin()}/api/vulnerabilities/${vulnerability.vulnerabilityName}/overview`;
            }

            return Object.assign(vulnerability, {
                detailsUrl
            });
        });
    }

    getComponentRiskProfile(componentVersion) {
        return this.getRelation(componentVersion, 'risk-profile');
    }

    async getListRelation(model, relationship) {
        const response = await this.getRelation(model, relationship);
        return response ? response.items : [];
    }

    async phoneHome(artifactVersion, metaData) {
        const origin = this.getOrigin();
        if (origin) {
            const registrationObject = await this.getRegistrationId();
            const { registrationId } = registrationObject;
            const hubVersion = await this.getHubVersion();
            const builder = new PhoneHomeRequestBodyBuilder();
            builder.customerId = registrationId;
            builder.artifactId = 'blackduck-radar';
            builder.artifactVersion = artifactVersion;
            builder.productId = PHONE_HOME_PRODUCT_ENUM.BLACK_DUCK.toString();
            builder.productVersion = hubVersion.version;
            builder.metaData = metaData;
            const phoneHomeRequestBody = builder.build();
            const phoneHomeClient = new PhoneHomeClient();
            phoneHomeClient.phoneHome(phoneHomeRequestBody);
        }
    }

    async getRegistrationId() {
        // TODO use non-v1 apis
        return this.get('/api/registration');
    }

    async getHubVersion() {
        return this.get('/api/current-version');
    }

    getRelation(model, relationship) {
        const hateoasModel = new HateoasModel(model);
        const relationUrl = hateoasModel.getFirstLink(relationship);
        return this.get(relationUrl, {
            queryMap: {
                limit: 10000
            }
        })
            .catch(() => null);
    }

    /*
     * @param {string} baseUrl
     * @param {object} [queryMap={}]
     * */
    getRequestUrl(baseUrl, queryMap = {}) {
        const origin = this.getOrigin();
        let url = null;
        if (baseUrl.startsWith('/') && origin) {
            // relative path
            url = new URL(origin);
            url.pathname = baseUrl;
        } else {
            try {
                url = new URL(baseUrl);
            } catch (err) {
                if (DEBUG_AJAX) {
                    console.log('getRequestUrl error', err);
                }
                return null;
            }
        }

        Object.keys(queryMap)
            .forEach(key => {
                url.searchParams.append(key, queryMap[key]);
            });

        return url;
    }

    /*
     * @param {string} baseUrl
     * @param {object} [queryMap]
     * */
    get(baseUrl, { queryMap, fetchOpts } = {}) {
        const url = this.getRequestUrl(baseUrl, queryMap);
        const opts = Object.assign({
            method: 'GET'
        }, fetchOpts);

        return this.fetch(url, opts);
    }

    post(baseUrl, { queryMap, fetchOpts } = {}) {
        const url = this.getRequestUrl(baseUrl, queryMap);
        const opts = Object.assign({
            method: 'POST'
        }, fetchOpts);

        return this.fetch(url, opts);
    }

    async fetch(url, _opts) {
        if (!url) {
            return null;
        }
        const includesAuthorizationHeader = _opts.headers && _opts.headers.Authorization;
        const headers = Object.assign({}, _opts.headers);
        if (!includesAuthorizationHeader) {
            const bearerToken = this.getBearerToken();
            headers.Authorization = `Bearer ${bearerToken}`;
        }
        const opts = Object.assign({ credentials: 'include' }, _opts, { headers });

        if (DEBUG_AJAX) {
            console.log(`Make Hub ${opts.method} request:`, url.toString());
            console.log('opts: ', opts);
        }

        const response = await fetch(url, opts);
        const body = await response.json()
            .catch(() => null);

        if (!response.ok) {
            if (DEBUG_AJAX) {
                console.warn(`Hub ${opts.method} request failed:`, url.toString());
                console.log('\n');
            }

            throw new Error(body.errorMessage);
        }

        if (DEBUG_AJAX) {
            console.log(`Hub ${opts.method} request completed:`, response.url);
            console.log(`Hub ${opts.method} request status:`, response.status);
            console.log('\n');
        }

        return body;
    }
}

export default Hub;
