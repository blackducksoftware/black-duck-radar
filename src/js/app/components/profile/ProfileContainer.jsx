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
import PanelHeader from './PanelHeader';
import LicensesContainer from './licenses/LicensesContainer';
import VulnerabilitiesContainer from './vulnerabilities/VulnerabilitiesContainer';
import PoliciesContainer from './policies/PoliciesContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import Splash from './splash/Splash';
import OperationalRiskContainer from './operationalrisk/OperationalRiskContainer';
import Tab from 'app/models/tab';
import { block } from 'css/common/blocks';
import { SYNC_PENDING } from 'shared/constants';

class ProfileContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        componentName: PropTypes.string,
        externalComponent: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        versionName: PropTypes.string
    };

    static defaultProps = {
        componentName: '',
        externalComponent: undefined,
        versionName: ''
    };

    shouldComponentUpdate({ externalComponent: newExternalComponent }) {
        const { externalComponent: oldExternalComponent } = this.props;

        // Update if we've just re-synced the external component, or if we've cleared it from the store
        return (oldExternalComponent === SYNC_PENDING
            && newExternalComponent !== SYNC_PENDING)
            || (Boolean(oldExternalComponent) && !newExternalComponent);
    }

    render() {
        const {
            componentName,
            versionName,
            componentUrl,
            isComponentIdentified,
            isComponentPage
        } = this.props;

        if (!isComponentIdentified || !isComponentPage) {
            return (
                <Splash
                    isComponentIdentified={isComponentIdentified}
                    isComponentPage={isComponentPage}
                />
            );
        }

        return (
            <div className={block}>
                <PanelHeader componentName={componentName} versionName={versionName} componentUrl={componentUrl} />
                <OperationalRiskContainer />
                <LicensesContainer />
                <VulnerabilitiesContainer />
                <PoliciesContainer />
                <ProjectsContainer />
            </div>
        );
    }
}

const mapStateToProps = ({
                             blackduckConfiguredState = {},
                             hubExternalComponentMap = {},
                             forgeComponentKeysMap = {}
                         }) => {
    const tabId = Tab.getId();
    const externalComponent = hubExternalComponentMap[tabId];
    const { componentName, versionName, version: componentUrl } = externalComponent || {};
    const { isBlackduckConfigured } = blackduckConfiguredState;

    return {
        isComponentIdentified: Boolean(hubExternalComponentMap[tabId]),
        isComponentPage: Boolean(forgeComponentKeysMap[tabId]),
        externalComponent,
        componentUrl,
        componentName,
        versionName,
        isBlackduckConfigured
    };
};

export default connect(mapStateToProps)(ProfileContainer);
