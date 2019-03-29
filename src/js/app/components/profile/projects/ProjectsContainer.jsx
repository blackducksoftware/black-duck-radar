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
import Section from './Section';
import Tab from 'app/models/tab';
import { syncHubComponentVersionReferenceProjectsAlias } from 'app/store/actions/alias-actions';
import { SYNC_PENDING } from 'shared/constants';

class ProjectsContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        projectList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ]),
        componentVersion: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        blackduckOrigin: PropTypes.string,
        syncHubComponentVersionReferenceProjects: PropTypes.func.isRequired
    };

    static defaultProps = {
        projectList: undefined,
        componentVersion: undefined,
        blackduckOrigin: undefined
    };

    componentDidMount() {
        const {
            componentVersion,
            syncHubComponentVersionReferenceProjects
        } = this.props;

        const isComponentVersionSynced = componentVersion && componentVersion !== SYNC_PENDING;

        if (isComponentVersionSynced) {
            syncHubComponentVersionReferenceProjects(componentVersion);
        }
    }

    componentWillReceiveProps({ componentVersion: newComponentVersion }) {
        const {
            componentVersion: oldComponentVersion,
            syncHubComponentVersionReferenceProjects
        } = this.props;
        const didComponentVersionSync = oldComponentVersion === SYNC_PENDING
            && newComponentVersion !== SYNC_PENDING
            && newComponentVersion;

        if (didComponentVersionSync) {
            syncHubComponentVersionReferenceProjects(newComponentVersion);
        }
    }

    shouldComponentUpdate({ projectList: newProjectList }) {
        const {
            projectList: oldProjectList
        } = this.props;
        const didProjectListSync = oldProjectList === SYNC_PENDING
            && newProjectList !== SYNC_PENDING
            && Boolean(newProjectList);
        const didProjectListClear = Boolean(oldProjectList) && newProjectList === undefined;

        return didProjectListClear || didProjectListSync;
    }

    render() {
        const { projectList, blackduckOrigin } = this.props;
        return (
            <Section
                projectList={projectList}
                blackduckOrigin={blackduckOrigin}
            />
        );
    }
}

const mapStateToProps = ({ blackduckOrigin, hubComponentVersionReferenceProjectsMap = {}, hubComponentVersionMap = {} }) => {
    const tabId = Tab.getId();
    const projectList = hubComponentVersionReferenceProjectsMap[tabId];
    const componentVersion = hubComponentVersionMap[tabId];

    return {
        projectList,
        componentVersion,
        blackduckOrigin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        syncHubComponentVersionReferenceProjects: (componentVersion) => {
            dispatch(syncHubComponentVersionReferenceProjectsAlias(Tab.getId(), componentVersion));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
