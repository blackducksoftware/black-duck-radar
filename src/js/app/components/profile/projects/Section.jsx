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
import SectionHeader from './SectionHeader';
import Project from './Project';
import { collapsedBlock, expandedBlock, maskBlock, paddedBlock } from 'css/common/blocks';

class Section extends Component {
    static propTypes = {
        projectList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ]),
        blackduckOrigin: PropTypes.string
    };

    static defaultProps = {
        projectList: [],
        blackduckOrigin: undefined
    };

    constructor(props) {
        super(props);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            isExpanded: true
        };
    }

    getUiUrl(apiUrl) {
        const { blackduckOrigin } = this.props;
        const versionId = apiUrl.split('/')
            .pop();
        const url = new URL(blackduckOrigin);
        url.pathname = `ui/versions/id:${versionId}`;
        return url;
    }

    getProjects(count) {
        if (!count) {
            return null;
        }

        const { projectList } = this.props;

        return [
            projectList.map(project => {
                return (
                    <Project
                        name={project.projectName}
                        version={project.versionName}
                        url={this.getUiUrl(project._meta.href)}
                        phase={project.phase}
                    />
                );
            })
        ];
    }

    handleHeaderClick() {
        const isExpanded = !this.state.isExpanded;
        this.setState({ isExpanded });
    }

    render() {
        const { projectList } = this.props;
        const count = Array.isArray(projectList) ? projectList.length : 0;
        const collapsibleState = this.state.isExpanded ? expandedBlock : collapsedBlock;

        return (
            <div className={paddedBlock}>
                <SectionHeader handleClick={this.handleHeaderClick} count={count} isExpanded={this.state.isExpanded} />
                <div className={maskBlock}>
                    <div className={collapsibleState}>
                        {this.getProjects(count)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;
