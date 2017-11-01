import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tab from 'app/models/tab';
import { syncHubComponentRiskProfileAlias } from 'app/store/actions/alias-actions';
import { SYNC_PENDING } from 'shared/constants';
import ActivityItem from './ActivityItem';
import CommitsItem from './CommitsItem';
import ContributorsItem from './ContributorsItem';
import NewVersionsItem from './NewVersionsItem';
import { riskItemsContainer, riskContainerHeader, riskContainer } from 'css/risk/risk-item';

class OperationalRiskContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isHubConnected: PropTypes.bool.isRequired,
        riskProfile: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]).isRequired,
        componentVersion: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]).isRequired,
        syncHubComponentRiskProfile: PropTypes.func.isRequired
    };

    static defaultProps = {
        riskProfile: undefined,
        isHubConnected: false,
        componentVersion: undefined
    };

    componentDidMount() {
        const {
            componentVersion,
            syncHubComponentRiskProfile
        } = this.props;

        const isComponentVersionSynced = componentVersion && componentVersion !== SYNC_PENDING;

        if (isComponentVersionSynced) {
            syncHubComponentRiskProfile(componentVersion);
        }
    }

    componentWillReceiveProps({ componentVersion: newComponentVersion }) {
        const {
            componentVersion: oldComponentVersion,
            syncHubComponentRiskProfile
        } = this.props;
        const didComponentVersionSync = oldComponentVersion === SYNC_PENDING
            && newComponentVersion !== SYNC_PENDING
            && newComponentVersion;

        if (didComponentVersionSync) {
            syncHubComponentRiskProfile(newComponentVersion);
        }
    }

    shouldComponentUpdate({ riskProfile: newRiskProfile }) {
        const {
            riskProfile: oldRiskProfile
        } = this.props;
        const didRiskProfileSync = oldRiskProfile === SYNC_PENDING && newRiskProfile !== SYNC_PENDING;
        const didRiskProfileClear = Boolean(oldRiskProfile) && newRiskProfile === undefined;
        return didRiskProfileSync || didRiskProfileClear;
    }

    render() {
        const { riskProfile, isHubConnected } = this.props;
        return (
            <div className={riskContainer}>
                <div className={riskContainerHeader}>Operational Risk for the last 12 Months</div>
                <div className={riskItemsContainer}>
                    <CommitsItem riskProfile={riskProfile} isHubConnected={isHubConnected} />
                    <NewVersionsItem riskProfile={riskProfile} isHubConnected={isHubConnected} />
                    <ContributorsItem riskProfile={riskProfile} isHubConnected={isHubConnected} />
                    <ActivityItem riskProfile={riskProfile} isHubConnected={isHubConnected} isBottomItem />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ hubComponentRiskProfileMap = {}, hubComponentVersionMap = {}, hubConnectionState }) => {
    const tabId = Tab.getId();
    const { isHubConnected } = hubConnectionState;
    const componentVersion = hubComponentVersionMap[tabId];
    const riskProfile = hubComponentRiskProfileMap[tabId];

    return {
        componentVersion,
        riskProfile,
        isHubConnected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        syncHubComponentRiskProfile: (componentVersion) => {
            dispatch(syncHubComponentRiskProfileAlias(Tab.getId(), componentVersion));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationalRiskContainer);
