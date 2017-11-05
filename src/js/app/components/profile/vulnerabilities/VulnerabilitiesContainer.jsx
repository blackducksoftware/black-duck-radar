import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from './Section';
import Tab from 'app/models/tab';
import { syncHubComponentVulnerabilitiesAlias } from 'app/store/actions/alias-actions';
import { SYNC_PENDING } from 'shared/constants';

class VulnerabilityContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        vulnerabilityList: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ])
    };

    static defaultProps = {
        vulnerabilityList: undefined
    };

    shouldComponentUpdate({ vulnerabilityList: newVulnerabilityList }) {
        const {
            vulnerabilityList: oldVulnerabilityList
        } = this.props;
        const didVulnerabilityListSync = oldVulnerabilityList === SYNC_PENDING && newVulnerabilityList !== SYNC_PENDING;
        const didVulnerabilityListClear = Boolean(oldVulnerabilityList) && newVulnerabilityList === undefined;

        return didVulnerabilityListClear || didVulnerabilityListSync;
    }

    getSortedList() {
        const { vulnerabilityList } = this.props;
        const getTime = (vuln) => {
            const date = vuln.vulnerabilityUpdatedDate || vuln.vulnerabilityPublishedDate;
            return (new Date(date)).getTime();
        };

        return !Array.isArray(vulnerabilityList) ? [] : vulnerabilityList
            .sort((a, b) => {
                const aTime = getTime(a);
                const bTime = getTime(b);

                if (aTime > bTime) {
                    return -1;
                } else if (aTime < bTime) {
                    return 1;
                }

                return 0;
            });
    }

    render() {
        return (
            <Section
                vulnerabilityList={this.getSortedList()}
            />
        );
    }
}

const mapStateToProps = ({ hubComponentVulnerabilitiesMap = {}, hubComponentVersionMap = {} }) => {
    const tabId = Tab.getId();
    const vulnerabilityList = hubComponentVulnerabilitiesMap[tabId];
    const componentVersion = hubComponentVersionMap[tabId];

    return {
        vulnerabilityList,
        componentVersion
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        syncHubComponentVulnerabilities: (componentVersion) => {
            dispatch(syncHubComponentVulnerabilitiesAlias(Tab.getId(), componentVersion));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VulnerabilityContainer);
