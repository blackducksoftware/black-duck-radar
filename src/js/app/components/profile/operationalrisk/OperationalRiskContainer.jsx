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
import Tab from 'app/models/tab';
import { syncHubComponentRiskProfileAlias } from 'app/store/actions/alias-actions';
import { SYNC_PENDING } from 'shared/constants';
import ActivityItem from './ActivityItem';
import CommitsItem from './CommitsItem';
import ContributorsItem from './ContributorsItem';
import NewVersionsItem from './NewVersionsItem';
import { riskContainer, riskContainerHeader, riskItemsContainer } from 'css/risk/risk-item';

class OperationalRiskContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isBlackduckConfigured: PropTypes.bool.isRequired,
        riskProfile: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        componentVersion: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        syncHubComponentRiskProfile: PropTypes.func.isRequired
    };

    static defaultProps = {
        riskProfile: undefined,
        isBlackduckConfigured: false,
        componentVersion: undefined
    };

    componentDidMount() {
        const {
            componentVersion,
            syncHubComponentRiskProfile
        } = this.props;

        const isComponentVersionSynced = componentVersion && componentVersion !== SYNC_PENDING;

        if (isComponentVersionSynced) {
            syncHubComponentRiskProfile(componentVersion);
        }
    }

    componentWillReceiveProps({ componentVersion: newComponentVersion }) {
        const {
            componentVersion: oldComponentVersion,
            syncHubComponentRiskProfile
        } = this.props;
        const didComponentVersionSync = oldComponentVersion === SYNC_PENDING
            && newComponentVersion !== SYNC_PENDING
            && newComponentVersion;

        if (didComponentVersionSync) {
            syncHubComponentRiskProfile(newComponentVersion);
        }
    }

    shouldComponentUpdate({ riskProfile: newRiskProfile }) {
        const {
            riskProfile: oldRiskProfile
        } = this.props;
        const didRiskProfileSync = oldRiskProfile === SYNC_PENDING && newRiskProfile !== SYNC_PENDING;
        const didRiskProfileClear = Boolean(oldRiskProfile) && newRiskProfile === undefined;
        return didRiskProfileSync || didRiskProfileClear;
    }

    render() {
        const { riskProfile, isBlackduckConfigured } = this.props;
        return (
            <div className={riskContainer}>
                <div className={riskContainerHeader}>Operational Risk for the last 12 Months</div>
                <div className={riskItemsContainer}>
                    <CommitsItem riskProfile={riskProfile} isBlackduckConfigured={isBlackduckConfigured} />
                    <NewVersionsItem riskProfile={riskProfile} isBlackduckConfigured={isBlackduckConfigured} />
                    <ContributorsItem riskProfile={riskProfile} isBlackduckConfigured={isBlackduckConfigured} />
                    <ActivityItem riskProfile={riskProfile} isBlackduckConfigured={isBlackduckConfigured} isBottomItem />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ hubComponentRiskProfileMap = {}, hubComponentVersionMap = {}, blackduckConfiguredState }) => {
    const tabId = Tab.getId();
    const { isBlackduckConfigured } = blackduckConfiguredState;
    const componentVersion = hubComponentVersionMap[tabId];
    const riskProfile = hubComponentRiskProfileMap[tabId];

    return {
        componentVersion,
        riskProfile,
        isBlackduckConfigured
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        syncHubComponentRiskProfile: (componentVersion) => {
            dispatch(syncHubComponentRiskProfileAlias(Tab.getId(), componentVersion));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationalRiskContainer);
