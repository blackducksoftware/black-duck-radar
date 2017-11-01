import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { licenseRow } from 'css/license';
import {
    licenseStatus,
    nameLabel,
    sharingLabel
} from 'css/license';

class License extends Component {
    static propTypes = {
        codeSharing: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        licenseUrl: PropTypes.object.isRequired,
        licenseTypeUrl: PropTypes.string.isRequired
    };

    getSharingLabel() {
        const { licenseTypeUrl } = this.props;
        const sharingLabel = this.props.codeSharing
            .split('_')
            .map(str => str[0] + str.slice(1).toLocaleLowerCase())
            .join(' ');

        if (sharingLabel) {
            return (
                <a href={licenseTypeUrl}
                   target='_blank'
                   title={sharingLabel}
                   rel='noopener noreferrer'>
                    { sharingLabel }
                </a>
            )
        }
        return codeSharingLabel
    }

    getNameLabel() {
        const { name, licenseUrl } = this.props;
        if (licenseUrl) {
            return (
                <a href={licenseUrl}
                   target='_blank'
                   title={name}
                   rel='noopener noreferrer'>
                    {name}
                </a>
            )
        }
        return name;
    }

    render() {
        return (
            <div className={licenseRow}>
                <div className={nameLabel}>
                    {this.getNameLabel()}
                </div>
                <div className={sharingLabel}>
                    {this.getSharingLabel()}
                </div>
            </div>
        );
    }
}

export default License;
