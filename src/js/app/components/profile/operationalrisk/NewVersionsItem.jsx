import React from 'react';
import RiskItem from './RiskItem';

class NewVersionsItem extends RiskItem {
    createIcon() {
        const { riskProfile } = this.props;
        if (riskProfile) {
            if (riskProfile.versionData) {
                const newReleaseCount = riskProfile.versionData.newerReleasesCount;
                if (newReleaseCount) {
                    const imageUrl = this.getImageUrl('img/new_version.png');
                    return (
                        <img src={imageUrl} />
                    );
                }
            }
        }
        return null;
    }

    getName() {
        return 'NEWER VERSIONS';
    }

    getValue() {
        const { riskProfile } = this.props;
        let newReleaseCount = '--';
        if (riskProfile) {
            if (riskProfile.versionData) {
                newReleaseCount = riskProfile.versionData.newerReleasesCount;
            }
        }
        return newReleaseCount;
    }
}

export default NewVersionsItem;
