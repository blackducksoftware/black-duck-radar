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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import License from './License';
import Tab from 'app/models/tab';
import { block } from 'css/common/blocks';
import { SYNC_PENDING } from 'shared/constants';

class LicensesContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        licenses: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ]),
        componentVersion: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        blackduckOrigin: PropTypes.string
    };

    static defaultProps = {
        licenses: undefined,
        componentVersion: undefined,
        blackduckOrigin: undefined
    };

    shouldComponentUpdate({ componentVersion: newComponentVersion }) {
        const { componentVersion: oldComponentVersion } = this.props;

        return (oldComponentVersion === SYNC_PENDING && newComponentVersion !== SYNC_PENDING)
            || (Boolean(oldComponentVersion) && newComponentVersion === undefined);
    }

    getUiUrl(apiUrl) {
        const { blackduckOrigin } = this.props;
        const licenseId = apiUrl.split('/')
        .pop();
        const url = new URL(blackduckOrigin);
        url.pathname = `api/licenses/${licenseId}/text`;
        return url;
    }

    getLicenseTypeUrl() {
        const { blackduckOrigin } = this.props;
        return `${blackduckOrigin}/doc/Welcome.htm#licenses/licenseriskvalues.htm`;
    }

    getLicenses() {
        const { licenses } = this.props;

        if (licenses.length) {
            return licenses.map(license => (
                <License
                    key={license.license}
                    name={license.name}
                    licenseFamilySummary={license.licenseFamilySummary}
                    codeSharing={license.codeSharing}
                    licenseUrl={this.getUiUrl(license.license)}
                    licenseTypeUrl={this.getLicenseTypeUrl()}
                />
            ));
        }

        return null;
    }

    render() {
        return (
            <div className={block}>
                {this.getLicenses()}
            </div>
        );
    }
}

const mapStateToProps = ({ blackduckOrigin, hubComponentVersionMap }) => {
    const tabId = Tab.getId();
    const componentVersion = hubComponentVersionMap[tabId];

    let licenses = [];
    if (componentVersion && typeof componentVersion === 'object') {
        const { license } = componentVersion;
        // This bit of ugliness is because the API returns the license fields on the top level object
        // if their is only a single license
        licenses = license.licenses.length ? license.licenses : [license];
    }

    return {
        blackduckOrigin,
        componentVersion,
        licenses
    };
};

export default connect(mapStateToProps)(LicensesContainer);
