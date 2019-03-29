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
import { clickableRow, statusBar } from 'css/common/rows';
import { leftFloat, nameLabel } from 'css/project/row';

class Project extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        phase: PropTypes.string.isRequired
    };

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const { name, version, url, phase } = this.props;
        const textArray = [name, ' ', version, ' ', ' | ', phase];
        const text = ''.concat(...textArray);
        return (
            <div className={clickableRow}>
                <div className={leftFloat}>
                    <span className={statusBar} />
                    <a className={nameLabel} title={text} href={url} target='_blank' rel='noopener noreferrer'>
                        {text}
                    </a>
                </div>
            </div>
        );
    }
}

export default Project;
