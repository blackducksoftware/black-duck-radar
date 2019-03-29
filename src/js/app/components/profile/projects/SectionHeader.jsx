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

import React from 'react';
import PropTypes from 'prop-types';
import { sectionHeader, sectionHeaderWithData } from 'css/common/headers';
import { headerChevron, headerCount, headerLabel } from 'css/project/section-header';

const SectionHeader = ({ count, handleClick, isExpanded }) => {
    const label = `Project${count === 1 ? '' : 's'}`;
    const faClasses = `fa ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`;
    let headerClasses = `${sectionHeader}`;
    if (count > 0) {
        headerClasses = `${sectionHeader} ${sectionHeaderWithData}`;
    }
    return (
        <div className={headerClasses} onClick={handleClick}>
            <i className={`${headerChevron} ${faClasses}`} />
            <span className={headerCount}>
                {count}
            </span>
            <span className={headerLabel}>
                {label}
            </span>
        </div>
    );
};

SectionHeader.propTypes = {
    count: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
};

export default SectionHeader;
