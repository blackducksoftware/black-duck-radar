/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class History extends Component {
    static itemName = 'HISTORY';

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.selectItem(History.itemName);
        this.context.router.history.push('/history');
    }

    shouldComponentUpdate({ isSelected: willBeSelected }) {
        const { isSelected } = this.props;
        return isSelected !== willBeSelected;
    }

    render() {
        return (
            <MenuItem
                itemName={History.itemName}
                isSelected={this.props.isSelected}
                onClick={this.onClick}
            />
        );
    }
}

export default History;
/* eslint-enable */
