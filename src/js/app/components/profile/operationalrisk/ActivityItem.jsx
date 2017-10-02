import React from 'react';
import RiskItem from './RiskItem';
import { flipIcon } from 'css/risk/risk-item';

class ActivityItem extends RiskItem {
    createIcon() {
        const { riskProfile } = this.props;
        let isIncreasing = false;
        let isDecreasing = false;
        if (riskProfile) {
            if (riskProfile.activityData) {
                if (riskProfile.activityData.trending === 'INCREASING') {
                    isIncreasing = true;
                } else if (riskProfile.activityData.trending === 'DECREASING') {
                    isDecreasing = true;
                }
            }
        }

        if (isIncreasing || isDecreasing) {
            const imageUrl = this.getImageUrl('img/arrow.png');
            if (isIncreasing) {
                return (
                    <img src={imageUrl} />
                );
            } else if (isDecreasing) {
                return (
                    <img src={imageUrl} className={flipIcon} />
                );
            }
            return null;
        }
        return null;
    }

    getName() {
        const { riskProfile, isHubConnected } = this.props;
        let activityLabel = 'ACTIVITY';
        if (riskProfile) {
            if (riskProfile.activityData) {
                if (riskProfile.activityData.trending === 'INCREASING') {
                    activityLabel = 'INCREASING ACTIVITY';
                } else if (riskProfile.activityData.trending === 'DECREASING') {
                    activityLabel = 'DECREASING ACTIVITY';
                } else {
                    activityLabel = 'NO ACTIVITY';
                }
            } else {
                activityLabel = 'NO ACTIVITY';
            }
        } else if (isHubConnected) {
            activityLabel = 'NO ACTIVITY';
        }

        return activityLabel;
    }

    getValue() {
        return null;
    }
}

export default ActivityItem;
