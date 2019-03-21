import React from 'react';
import RiskItem from './RiskItem';
import {
    flip,
    bgIcon,
    activityIcon
} from 'css/risk/risk-item';

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
        ])
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
