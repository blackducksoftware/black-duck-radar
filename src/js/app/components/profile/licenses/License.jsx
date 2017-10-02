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
        url: PropTypes.string.isRequired
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
        const { name, url } = this.props;
        if (url) {
            return (
                <div className={row}>
                    <div className={licenseStatus} />
                    <div className={nameLabel}>
                        <a href={url} target='_blank' title={name} rel='noopener noreferrer'>{name}</a>
                    </div>
                    <div className={sharingLabel}>
                        { this.getCodeSharingLabel() }
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
                    { this.getCodeSharingLabel() }
                </div>
            </div>
        );
    }
}

export default License;
