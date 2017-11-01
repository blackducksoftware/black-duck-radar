import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import License from './License';
import Tab from 'app/models/tab';
import { block } from 'css/common/blocks';
import { SYNC_PENDING } from 'shared/constants';

class LicenseContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        licenses: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.string
        ]),
        componentVersion: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        hubOrigin: PropTypes.string
    };

    static defaultProps = {
        licenses: undefined,
        componentVersion: undefined,
        hubOrigin: undefined
    };

    shouldComponentUpdate({ componentVersion: newComponentVersion }) {
        const { componentVersion: oldComponentVersion } = this.props;

        return (oldComponentVersion === SYNC_PENDING && newComponentVersion !== SYNC_PENDING)
            || (Boolean(oldComponentVersion) && newComponentVersion === undefined);
    }

    getUiUrl(apiUrl) {
        const { hubOrigin } = this.props;
        const licenseId = apiUrl.split('/').pop();
        const url = new URL(hubOrigin);
        url.pathname = `ui/licenses/id:${licenseId}`;
        return url;
    }

    getLicenseTypeUrl() {
        const { hubOrigin } = this.props;
        return `${hubOrigin}/doc/Welcome.htm#licenses/licenseriskvalues.htm`;
    }

    getLicenses() {
        const { licenses } = this.props;

        if (licenses.length) {
            return licenses.map(license => (
                <License
                    key={license.license}
                    name={license.name}
                    codeSharing={license.codeSharing}
                    licenseUrl={this.getUiUrl(license.license)}
                    licenseTypeUrl={this.getLicenseTypeUrl()}
                />
            ));
        }

        return null;
    }

    render() {
        return (
            <div className={block}>
                { this.getLicenses() }
            </div>
        );
    }
}

const mapStateToProps = ({ hubOrigin, hubComponentVersionMap }) => {
    const tabId = Tab.getId();
    const componentVersion = hubComponentVersionMap[tabId];

    let licenses = [];
    if (componentVersion && typeof componentVersion === 'object') {
        const { license } =  componentVersion;
        // This bit of ugliness is because the API returns the license fields on the top level object
        // if their is only a single license
        licenses = license.licenses.length ? license.licenses : [license];
    }

    return {
        hubOrigin,
        componentVersion,
        licenses
    };
};

export default connect(mapStateToProps)(LicenseContainer);
