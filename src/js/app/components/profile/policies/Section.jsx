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
import Policy from './Policy';
import { collapsedBlock, expandedBlock, maskBlock, paddedBlock } from 'css/common/blocks';

class Section extends Component {
    static propTypes = {
        policyList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ])
    };

    static defaultProps = {
        policyList: []
    };

    constructor(props) {
        super(props);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.state = {
            isExpanded: true
        };
    }

    getPolicies(count) {
        if (!count) {
            return null;
        }

        const { policyList } = this.props;

        return [
            policyList.map((policy) => {
                return (
                    <Policy
                        name={policy.name}
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
        const { policyList } = this.props;
        const count = Array.isArray(policyList) ? policyList.length : 0;

        const collapsibleState = this.state.isExpanded ? expandedBlock : collapsedBlock;

        return (
            <div className={paddedBlock}>
                <SectionHeader handleClick={this.handleHeaderClick} count={count} isExpanded={this.state.isExpanded} />
                <div className={maskBlock}>
                    <div className={collapsibleState}>
                        {this.getPolicies(count)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;
