import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    syncHubComponentPolicyRulesAlias,
    syncHubProjectVersionComponentsAlias,
    updateExtensionIconAlias
} from 'app/store/actions/alias-actions';
import Tab from 'app/models/tab';
import Section from './Section';
import { SYNC_PENDING } from 'shared/constants';

class PoliciesContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        policyList: PropTypes.arrayOf(PropTypes.object),
        bomComponents: PropTypes.arrayOf(PropTypes.object),
        externalComponent: PropTypes.object,
        referenceProjects: PropTypes.arrayOf(PropTypes.object),
        syncHubComponentPolicyRules: PropTypes.func.isRequired,
        syncHubProjectVersionComponents: PropTypes.func.isRequired,
        updateExtensionIcon: PropTypes.func.isRequired
    };

    static defaultProps = {
        policyList: undefined,
        bomComponents: undefined,
        externalComponent: undefined,
        referenceProjects: undefined
    };

    componentDidMount() {
        const {
            bomComponents,
            externalComponent,
            referenceProjects,
            syncHubComponentPolicyRules,
            syncHubProjectVersionComponents
        } = this.props;
        const areBomComponentsSynced = bomComponents && bomComponents !== SYNC_PENDING;
        const isExternalComponentSynced = externalComponent && externalComponent !== SYNC_PENDING;
        const areReferenceProjectsSynced = referenceProjects && referenceProjects !== SYNC_PENDING;

        if (areBomComponentsSynced) {
            syncHubComponentPolicyRules(bomComponents);
        } else if (isExternalComponentSynced && areReferenceProjectsSynced) {
            syncHubProjectVersionComponents(externalComponent, referenceProjects);
        }
    }

    componentWillReceiveProps({
        bomComponents: newBomComponents,
        externalComponent: newExternalComponent,
        referenceProjects: newReferenceProjects,
        policyList: newPolicyList
    }) {
        const {
            referenceProjects: oldReferenceProjects,
            bomComponents: oldBomComponents,
            syncHubComponentPolicyRules,
            syncHubProjectVersionComponents,
            updateExtensionIcon,
            policyList: oldPolicyList
        } = this.props;

        const didBomComponentsUpdate = oldBomComponents === SYNC_PENDING
            && newBomComponents !== SYNC_PENDING
            && Boolean(newBomComponents);
        const didReferenceProjectsUpdate = oldReferenceProjects === SYNC_PENDING
            && newReferenceProjects !== SYNC_PENDING
            && Boolean(newReferenceProjects);
        const isExternalComponentSynced = newExternalComponent && newExternalComponent !== SYNC_PENDING;
        const didPolicyListChange = this.hasPolicyListChanged(oldPolicyList, newPolicyList);

        if (didBomComponentsUpdate) {
            syncHubComponentPolicyRules(newBomComponents);
        } else if (didReferenceProjectsUpdate && isExternalComponentSynced) {
            syncHubProjectVersionComponents(newExternalComponent, newReferenceProjects);
        } else if (didPolicyListChange) {
            updateExtensionIcon();
        }
    }

    shouldComponentUpdate({ policyList: newPolicyList }) {
        const {
            policyList: oldPolicyList
        } = this.props;

        return this.hasPolicyListChanged(oldPolicyList, newPolicyList);
    }

    hasPolicyListChanged(oldPolicyList, newPolicyList) {
        const didPolicyListSync = oldPolicyList === SYNC_PENDING && newPolicyList !== SYNC_PENDING;
        const didPolicyListClear = Boolean(oldPolicyList) && newPolicyList === undefined;

        return didPolicyListSync || didPolicyListClear;
    }

    render() {
        const { policyList } = this.props;
        return (
            <Section
                policyList={policyList}
            />
        );
    }
}

const mapStateToProps = ({
    hubComponentPolicyRulesMap = {},
    hubProjectVersionComponentsMap = {},
    hubComponentVersionReferenceProjectsMap = {},
    hubExternalComponentMap = {}
}) => {
    const tabId = Tab.getId();
    const referenceProjects = hubComponentVersionReferenceProjectsMap[tabId];
    const policyList = hubComponentPolicyRulesMap[tabId];
    const bomComponents = hubProjectVersionComponentsMap[tabId];
    const externalComponent = hubExternalComponentMap[tabId];

    return {
        policyList,
        bomComponents,
        referenceProjects,
        externalComponent
    };
};

const mapDispatchToProps = (dispatch) => {
    const tabId = Tab.getId();
    return {
        syncHubComponentPolicyRules: (bomComponents) => {
            dispatch(syncHubComponentPolicyRulesAlias(tabId, bomComponents));
        },
        syncHubProjectVersionComponents: (externalComponent, referenceProjects) => {
            dispatch(syncHubProjectVersionComponentsAlias(tabId, externalComponent, referenceProjects));
        },
        updateExtensionIcon: () => {
            dispatch(updateExtensionIconAlias(tabId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoliciesContainer);
