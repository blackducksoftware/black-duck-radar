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
import { VULN_SEVERITIES } from 'shared/constants';
import SectionHeader from './SectionHeader';
import RowHeader from './RowHeader';
import Vulnerability from './Vulnerability';
import { collapsedBlock, expandedBlock, maskBlock, paddedBlock } from 'css/common/blocks';

class Section extends Component {
    static propTypes = {
        vulnerabilityList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ])
    };

    static defaultProps = {
        vulnerabilityList: []
    };

    constructor(props) {
        super(props);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            isExpanded: true
        };
    }

    getVulnerabilities(targetSeverity, totalCount) {
        if (!totalCount) {
            return null;
        }

        const { vulnerabilityList } = this.props;
        const filteredList = vulnerabilityList.filter(vuln => vuln.severity === targetSeverity.toUpperCase());
        const count = filteredList.length;

        if (!count) {
            // If there aren't any vulnerabilities matching this targetSeverity, don't
            // render heading
            return null;
        }

        return [
            <RowHeader severity={targetSeverity} count={count} key={targetSeverity} />,
            filteredList.map(({
                                  vulnerabilityName,
                                  severity,
                                  source,
                                  detailsUrl,
                                  vulnerabilityPublishedDate,
                                  vulnerabilityUpdatedDate
                              }) => {
                return (
                    <Vulnerability
                        name={vulnerabilityName}
                        severity={severity}
                        source={source}
                        url={detailsUrl}
                        created={vulnerabilityPublishedDate}
                        updated={vulnerabilityUpdatedDate}
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
        const { isExpanded } = this.state;
        const { vulnerabilityList } = this.props;
        const count = Array.isArray(vulnerabilityList) ? vulnerabilityList.length : 0;
        const collapsibleState = isExpanded && count ? expandedBlock : collapsedBlock;

        return (
            <div className={paddedBlock}>
                <SectionHeader handleClick={this.handleHeaderClick} count={count} isExpanded={isExpanded} />
                <div className={maskBlock}>
                    <div className={collapsibleState}>
                        {count && VULN_SEVERITIES.map(severity => this.getVulnerabilities(severity, count))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;
