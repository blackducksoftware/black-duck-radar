import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanelHeader from './PanelHeader';
import LicensesContainer from './licenses/LicensesContainer';
import VulnerabilitiesContainer from './vulnerabilities/VulnerabilitiesContainer';
import PoliciesContainer from './policies/PoliciesContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import OperationalRiskContainer from './operationalrisk/OperationalRiskContainer';
import Tab from 'app/models/tab';
import { block } from 'css/common/blocks';
import { SYNC_PENDING } from 'shared/constants';

class ProfileContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        componentName: PropTypes.string,
        externalComponent: PropTypes.object,
        versionName: PropTypes.string
    };

    static defaultProps = {
        componentName: '',
        externalComponent: undefined,
        versionName: ''
    };

    shouldComponentUpdate({ externalComponent: newExternalComponent }) {
        const { externalComponent: oldExternalComponent } = this.props;

        // Update if we've just re-synced the external component, or if we've cleared it from the store
        return (oldExternalComponent === SYNC_PENDING
            && newExternalComponent !== SYNC_PENDING)
            || (Boolean(oldExternalComponent) && !newExternalComponent);
    }

    render() {
        const { componentName, versionName } = this.props;
        return (
            <div className={block}>
                <PanelHeader componentName={componentName} versionName={versionName} />
                <LicensesContainer />
                <OperationalRiskContainer />
                <VulnerabilitiesContainer />
                <PoliciesContainer />
                <ProjectsContainer />
            </div>
        );
    }
}

const mapStateToProps = ({ hubConnectionState = {}, hubExternalComponentMap = {} }) => {
    const tabId = Tab.getId();
    const externalComponent = hubExternalComponentMap[tabId];
    const { componentName, versionName } = externalComponent || {};
    const { isHubConnected } = hubConnectionState;

    return {
        externalComponent,
        componentName,
        versionName,
        isHubConnected
    };
};

const mapDispatchToProps = () => { };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
