import React from 'react';
import RiskItem from './RiskItem';
import { contributorsIcon } from 'css/risk/risk-item';

class ContributorsItem extends RiskItem {
    createIcon() {
        const { riskProfile = {} } = this.props;
        const { activityData = {} } = riskProfile;
        const { contributorCount12Month } = activityData;

        if (contributorCount12Month === undefined) {
            return null;
        }

        const fgClasses = `fa fa-user-circle ${contributorsIcon}`;

        return ([
            <i className={fgClasses} ariaHidden="true" key="contributors-fgicon" />
        ]);
    }

    getName() {
        return 'Contributors';
    }

    getValue() {
        const { riskProfile } = this.props;
        let contributorCount = '--';
        if (riskProfile) {
            if (riskProfile.activityData) {
                contributorCount = riskProfile.activityData.contributorCount12Month;
            }
        }
        return contributorCount;
    }
}

export default ContributorsItem;
