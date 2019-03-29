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

/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class History extends Component {
    static itemName = 'HISTORY';

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.selectItem(History.itemName);
        this.context.router.history.push('/history');
    }

    shouldComponentUpdate({ isSelected: willBeSelected }) {
        const { isSelected } = this.props;
        return isSelected !== willBeSelected;
    }

    render() {
        return (
            <MenuItem
                itemName={History.itemName}
                isSelected={this.props.isSelected}
                onClick={this.onClick}
            />
        );
    }
}

export default History;
/* eslint-enable */
