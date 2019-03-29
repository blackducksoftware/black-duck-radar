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
import { itemBox, itemLabel } from 'css/risk/risk-item';

class RiskItem extends Component {
    createIcon() {
        console.error('CreateIcon called of RiskItem class');
    }

    getName() {
        console.error('getName called of RiskItem class');
    }

    getValue() {
        console.error('getValue called of RiskItem class');
    }

    getImageUrl(url) {
        return chrome.extension.getURL(url);
    }

    render() {
        return (
            <div className={itemBox}>
                <span className={itemLabel}>{this.getValue()}<br />{this.getName()}</span>
                {this.createIcon()}
            </div>
        );
    }
}

export default RiskItem;
