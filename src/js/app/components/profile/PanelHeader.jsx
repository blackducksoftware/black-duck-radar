import React from 'react';
import PropTypes from 'prop-types';
import { panelHeader } from 'css/common/headers';
import { projectLabel, versionLabel } from 'css/profile/profile-panel';

const PanelHeader = ({ componentName, versionName, componentUrl }) => {
    return (
        <div className={panelHeader}>
            <a href={componentUrl}
               className={projectLabel}
               target='_blank'
               title={name}
               rel='noopener noreferrer'>
                {componentName}
            </a>
            <a href={componentUrl}
               className={versionLabel}
               target='_blank'
               title={name}
               rel='noopener noreferrer'>
                {versionName}
            </a>
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
