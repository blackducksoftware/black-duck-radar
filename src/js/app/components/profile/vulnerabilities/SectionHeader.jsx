import React from 'react';
import PropTypes from 'prop-types';
import { sectionHeader, sectionHeaderWithData } from 'css/common/headers';
import { headerLabel, headerCount, headerChevron } from 'css/vulnerability/section-header';

const SectionHeader = ({ count, handleClick, isExpanded }) => {
    const label = `Vulnerabilit${count === 1 ? 'y' : 'ies'}`;
    const faClasses = `fa ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`;
    let headerClasses = `${sectionHeader}`;
    if (count > 0) {
        headerClasses = `${sectionHeader} ${sectionHeaderWithData}`;
    }
    return (
        <div className={headerClasses} onClick={handleClick}>
            <i className={`${headerChevron} ${faClasses}`} />
            <span className={headerCount}>
                {count}
            </span>
            <span className={headerLabel}>
                {label}
            </span>
        </div>
    );
};

SectionHeader.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default SectionHeader;
