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
import { copywrite, copywriteBlock, helpContainer, helpPanelText } from 'css/help/help-panel';

class HelpContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        chromeExtensionDetails: PropTypes.object
    };

    static defaultProps = {
        chromeExtensionDetails: {
            description: '',
            version: '',
            name: ''
        }
    };

    shouldComponentUpdate({ chromeExtensionDetails: newChromeExtensionDetails }) {
        const { chromeExtensionDetails: oldChromeExtensionDetails } = this.props;
        const {
            description: newDescription,
            version: newVersion,
            name: newName
        } = newChromeExtensionDetails;
        const {
            description: oldDescription,
            version: oldVersion,
            name: oldName
        } = oldChromeExtensionDetails;

        const hasDescriptionChanged = oldDescription !== newDescription;
        const hasVersionChanged = oldVersion !== newVersion;
        const hasNameChanged = oldName !== newName;

        return hasDescriptionChanged || hasVersionChanged || hasNameChanged;
    }

    render() {
        const { chromeExtensionDetails } = this.props;
        const docUrl = 'https://synopsys.atlassian.net/wiki/spaces/INTDOCS/overview';
        const feedbackUrl = 'https://github.com/blackducksoftware/black-duck-radar/issues';
        return (
            <div className={helpContainer}>
                <div className={helpPanelText}>
                    <div>{chromeExtensionDetails.description}</div>
                    <div>Version: {chromeExtensionDetails.version}</div>
                    <div>
                        <a href={docUrl} title={docUrl} target='_blank'>Integrations Documentation</a>
                    </div>
                    <div>
                        <a href={feedbackUrl} title={feedbackUrl} target='_blank'>Send Feedback to the Team on GitHub</a>
                    </div>
                </div>
                <div className={copywriteBlock}>
                    <p className={copywrite}>
                        (c) 2019 Synopsys, Inc
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ chromeExtensionDetails = {} }) => {
    return { chromeExtensionDetails };
};

export default connect(mapStateToProps)(HelpContainer);
