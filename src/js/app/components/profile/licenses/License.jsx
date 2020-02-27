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
import { licenseRow, nameLabel, sharingLabel } from 'css/license';

class License extends Component {

    getSharingLabel() {
        const { licenseTypeUrl, licenseFamilySummary } = this.props;
        let finalLicenseTypeLabel = "";
        let finalLicenseTypeURL = "";
        if (this.props.codeSharing) {
            finalLicenseTypeURL = licenseTypeUrl;
            finalLicenseTypeLabel = this.props.codeSharing
            .split('_')
            .map(str => str[0] + str.slice(1)
            .toLocaleLowerCase())
            .join(' ');
        }
        if (licenseFamilySummary && licenseFamilySummary.href && licenseFamilySummary.name) {
            finalLicenseTypeURL = licenseFamilySummary.href;
            finalLicenseTypeLabel = licenseFamilySummary.name;
        }


        if (finalLicenseTypeLabel) {
            return (
                <a href={finalLicenseTypeURL}
                   target='_blank'
                   title={finalLicenseTypeLabel}
                   rel='noopener noreferrer'>
                    {finalLicenseTypeLabel}
                </a>
            );
        }
        return finalLicenseTypeLabel;
    }

    getNameLabel() {
        const { name, licenseUrl } = this.props;
        if (licenseUrl) {
            return (
                <a href={licenseUrl}
                   target='_blank'
                   title={name}
                   rel='noopener noreferrer'>
                    {name}
                </a>
            );
        }
        return name;
    }

    render() {
        return (
            <div className={licenseRow}>
                <div className={nameLabel}>
                    {this.getNameLabel()}
                </div>
                <div className={sharingLabel}>
                    {this.getSharingLabel()}
                </div>
            </div>
        );
    }
}

License.propTypes = {
    licenseFamilySummary: PropTypes.object.isRequired,
    codeSharing: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    licenseUrl: PropTypes.object.isRequired,
    licenseTypeUrl: PropTypes.string.isRequired
};

export default License;
