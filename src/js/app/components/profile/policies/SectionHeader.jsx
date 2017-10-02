import React from 'react';
import PropTypes from 'prop-types';
import { sectionHeader, sectionHeaderWithData } from 'css/common/headers';
import { headerLabel, headerCount, headerChevron } from 'css/policy/section-header';

const SectionHeader = ({ count, handleClick, isExpanded }) => {
    const label = `Policy Violation${count === 1 ? '' : 's'}`;
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
    count: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
};

export default SectionHeader;
