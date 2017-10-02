import React from 'react';
import PropTypes from 'prop-types';
import { panelHeader } from 'css/common/headers';
import { projectLabel, versionLabel } from 'css/profile/profile-panel';

const PanelHeader = ({ componentName, versionName }) => {
    return (
        <div className={panelHeader}>
            <span className={projectLabel}>
                {componentName}
            </span>
            <span className={versionLabel}>
                {versionName}
            </span>
        </div>
    );
};

PanelHeader.propTypes = {
    componentName: PropTypes.string,
    versionName: PropTypes.string
};

PanelHeader.defaultProps = {
    componentName: undefined,
    versionName: undefined
};

export default PanelHeader;
