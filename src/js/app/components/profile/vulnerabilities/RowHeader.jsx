import React from 'react';
import PropTypes from 'prop-types';
import { row } from 'css/common/rows';
import { countLabel, severityLabel } from 'css/vulnerability/row-header';

const RowHeader = ({ severity, count }) => {
    return (
        <div className={row} key={severity}>
            <span className={countLabel}>
                {count}
            </span>
            <span className={severityLabel}>
                {severity}
            </span>
        </div>
    );
};

RowHeader.propTypes = {
    severity: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default RowHeader;
