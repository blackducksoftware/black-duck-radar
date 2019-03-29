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
import { bgIcon, commitsIcon } from 'css/risk/risk-item';

class CommitsItem extends RiskItem {
    createIcon() {
        const { riskProfile = {} } = this.props;
        const { activityData = {} } = riskProfile;
        const { commitCount12Month } = activityData;

        if (commitCount12Month === undefined) {
            return null;
        }

        const fgClasses = `fa fa-code-fork ${commitsIcon}`;
        const bgClasses = `fa fa-circle ${bgIcon}`;

        return ([
            <i className={fgClasses} key="commits-fgicon" />,
            <i className={bgClasses} key="commits-bgicon" />
        ]);
    }

    getName() {
        return 'Commits';
    }

    getValue() {
        const { riskProfile } = this.props;
        let commitCount = '--';
        if (riskProfile) {
            if (riskProfile.activityData) {
                commitCount = riskProfile.activityData.commitCount12Month;
            }
        }
        return commitCount;
    }
}

export default CommitsItem;
