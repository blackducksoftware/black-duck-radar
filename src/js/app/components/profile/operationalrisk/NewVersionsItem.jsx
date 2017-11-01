import React from 'react';
import RiskItem from './RiskItem';
import { versionsIcon } from 'css/risk/risk-item';

class NewVersionsItem extends RiskItem {
    createIcon() {
        const { riskProfile = {} } = this.props;
        const { versionData = {} } = riskProfile;
        const { newerReleasesCount } = versionData;

        if (newerReleasesCount === undefined) {
            return null;
        }

        const fgClasses = `fa fa-plus-circle ${versionsIcon}`;

        return ([
            <i className={fgClasses} key="versions-fgicon" />
        ]);
    }

    getName() {
        return 'Newer Versions';
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
