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
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import Tab from 'app/models/tab';
import { refreshComponentAlias } from 'app/store/actions/alias-actions';

class Profile extends Component {
    static itemName = 'PROFILE';

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isSelected: PropTypes.bool,
        selectItem: PropTypes.func.isRequired,
        refreshComponent: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSelected: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate({ isSelected: willBeSelected }) {
        const { isSelected } = this.props;
        return isSelected !== willBeSelected;
    }

    handleClick() {
        this.props.selectItem(Profile.itemName);
        this.context.router.history.push('/profile');
        const { refreshComponent } = this.props;
        refreshComponent();
    }

    render() {
        const { isSelected } = this.props;
        return (
            <MenuItem
                isSelected={isSelected}
                itemName={Profile.itemName}
                onClick={this.handleClick}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    const tabId = Tab.getId();
    return {
        refreshComponent: () => {
            dispatch(refreshComponentAlias(tabId));
        }
    };
};

export default connect(null, mapDispatchToProps)(Profile);
