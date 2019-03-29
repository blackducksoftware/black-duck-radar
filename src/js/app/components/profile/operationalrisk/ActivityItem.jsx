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
import RiskItem from './RiskItem';
import { activityIcon, bgIcon, flip } from 'css/risk/risk-item';

class ActivityItem extends RiskItem {
    createIcon() {
        const { riskProfile = {} } = this.props;
        const { activityData } = riskProfile;

        if (!activityData) {
            return null;
        }

        let icon;
        switch (activityData.trending) {
            case 'INCREASING':
                icon = 'fa-arrow-circle-up';
                break;

            case 'DECREASING':
                icon = 'fa-arrow-circle-down';
                break;

            default:
                icon = 'fa-arrow-circle-right';
                break;
        }

        const fgClasses = `fa ${icon} ${activityIcon}`;

        return ([
            <i className={fgClasses} key={fgClasses} />
        ]);
    }

    getName() {
        const { riskProfile, isBlackduckConfigured } = this.props;
        let activityLabel = 'Activity';
        if (riskProfile) {
            if (riskProfile.activityData) {
                if (riskProfile.activityData.trending === 'INCREASING') {
                    activityLabel = 'Increasing Activity';
                } else if (riskProfile.activityData.trending === 'DECREASING') {
                    activityLabel = 'Decreasing Activity';
                } else {
                    activityLabel = 'Stable Activity';
                }
            } else {
                activityLabel = 'Stable Activity';
            }
        } else if (isBlackduckConfigured) {
            activityLabel = 'Stable Activity';
        }

        return activityLabel;
    }

    getValue() {
        return null;
    }
}

export default ActivityItem;
