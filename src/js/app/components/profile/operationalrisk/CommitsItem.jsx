import React from 'react';
import RiskItem from './RiskItem';

class CommitsItem extends RiskItem {
    createIcon() {
        const { riskProfile } = this.props;
        if (riskProfile) {
            if (riskProfile.activityData) {
                const commitCount = riskProfile.activityData.commitCount12Month;
                if (commitCount) {
                    const imageUrl = this.getImageUrl('img/commits.png');
                    return (
                        <img src={imageUrl} />
                    );
                }
            }
        }
        return null;
    }

    getName() {
        return 'COMMITS';
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
