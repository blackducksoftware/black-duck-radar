import React from 'react';
import RiskItem from './RiskItem';
import { commitsIcon, bgIcon } from 'css/risk/risk-item';

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
