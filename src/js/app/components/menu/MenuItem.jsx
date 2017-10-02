import React from 'react';
import PropTypes from 'prop-types';
import {
    selectedBar,
    unselectedBar,
    menuItem,
    clickableMenuItem
} from 'css/menu';

const MenuItem = ({ isSelected, itemName, onClick }) => {
    const barClass = isSelected ? selectedBar : unselectedBar;
    return (
        <div className={clickableMenuItem} onClick={onClick}>
            <div className={barClass}>
                <div className={menuItem}>
                    { itemName }
                </div>
            </div>
        </div>
    );
};

MenuItem.propTypes = {
    isSelected: PropTypes.bool,
    itemName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

MenuItem.defaultProps = {
    isSelected: false
};

export default MenuItem;
