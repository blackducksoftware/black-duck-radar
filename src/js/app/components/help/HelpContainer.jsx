import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { helpContainer, helpPanelText, copywriteBlock, copywrite } from 'css/help/help-panel';

class HelpContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        chromeExtensionDetails: PropTypes.object
    };

    static defaultProps = {
        chromeExtensionDetails: {
            description: '',
            version: '',
            name: ''
        }
    }

    shouldComponentUpdate({ chromeExtensionDetails: newChromeExtensionDetails }) {
        const { chromeExtensionDetails: oldChromeExtensionDetails } = this.props;
        const {
            description: newDescription,
            version: newVersion,
            name: newName
        } = newChromeExtensionDetails;
        const {
            description: oldDescription,
            version: oldVersion,
            name: oldName
        } = oldChromeExtensionDetails;

        const hasDescriptionChanged = oldDescription !== newDescription;
        const hasVersionChanged = oldVersion !== newVersion;
        const hasNameChanged = oldName !== newName;

        return hasDescriptionChanged || hasVersionChanged || hasNameChanged;
    }

    render() {
        const { chromeExtensionDetails } = this.props;
        const docUrl = 'https://blackducksoftware.atlassian.net/wiki/spaces/INTDOCS/overview';
        return (
            <div className={helpContainer}>
                <div className={helpPanelText}>
                    <div>{chromeExtensionDetails.description}</div>
                    <div>Version: {chromeExtensionDetails.version}</div>
                    <a href={docUrl} title={docUrl} target='_blank'>Integrations Documentation</a>
                </div>
                <div className={copywriteBlock}>
                    <p className={copywrite}>
                        (c) BlackDuck Software 2017
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ chromeExtensionDetails = {} }) => {
    if (chromeExtensionDetails) {
        return { chromeExtensionDetails };
    }
    return {
        chromeExtensionDetails: {
            description: '',
            version: '',
            name: ''
        }
    };
};
const mapDispatchToProps = () => { };

export default connect(mapStateToProps, mapDispatchToProps)(HelpContainer);
