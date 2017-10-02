import React from 'react';
import RiskItem from './RiskItem';
import {
    contributors
} from 'css/risk/risk-item';

class ContributorsItem extends RiskItem {
    createIcon() {
        const { riskProfile } = this.props;
        if (riskProfile) {
            if (riskProfile.activityData) {
                const contributorCount = riskProfile.activityData.contributorCount12Month;
                if (contributorCount) {
                    const imageUrl = this.getImageUrl('img/contributors.png');
                    return (
                        <img className={contributors} src={imageUrl} />
                    );
                }
            }
        }
        return null;
    }

    getName() {
        return 'CONTRIBUTORS';
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
