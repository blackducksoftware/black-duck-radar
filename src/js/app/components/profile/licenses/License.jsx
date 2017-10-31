import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { row } from 'css/common/rows';
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

    getCodeSharingLabel() {
        const { codeSharing } = this.props;
        if (codeSharing) {
            return codeSharing
                .split('_')
                .map(str => str[0] + str.slice(1).toLocaleLowerCase())
                .join(' ');
        }
    }

    render() {
        const { name, licenseUrl, licenseTypeUrl } = this.props;
        const codeSharingLabel = this.getCodeSharingLabel();
        if (licenseUrl && licenseTypeUrl) {
            return (
                <div className={row}>
                    <div className={licenseStatus} />
                    <div className={nameLabel}>
                        <a href={licenseUrl} target='_blank' title={name} rel='noopener noreferrer'>{name}</a>
                    </div>
                    <div className={sharingLabel}>
                        <a href={licenseTypeUrl} target='_blank' title={codeSharingLabel} rel='noopener noreferrer'>{ codeSharingLabel }</a>
                    </div>
                </div>
            );
        }
        else if (licenseUrl) {
            return (
                <div className={row}>
                    <div className={licenseStatus} />
                    <div className={nameLabel}>
                        <a href={licenseUrl} target='_blank' title={name} rel='noopener noreferrer'>{name}</a>
                    </div>
                    <div className={sharingLabel}>
                        { codeSharingLabel }
                    </div>
                </div>
            );
        }
        else if (licenseTypeUrl) {
            return (
                <div className={row}>
                    <div className={licenseStatus} />
                    <div className={nameLabel} title={name}>
                        {name}
                    </div>
                    <div className={sharingLabel}>
                        <a href={licenseTypeUrl} target='_blank' title={codeSharingLabel} rel='noopener noreferrer'>{ codeSharingLabel }</a>
                    </div>
                </div>
            );
        }
        return (
            <div className={row}>
                <div className={licenseStatus} />
                <div className={nameLabel} title={name}>
                    {name}
                </div>
                <div className={sharingLabel}>
                    { codeSharingLabel }
                </div>
            </div>
        );
    }
}

export default License;
