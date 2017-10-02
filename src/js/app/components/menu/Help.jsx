import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Help extends Component {
    static itemName = 'HELP';

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isSelected: PropTypes.bool,
        selectItem: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSelected: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate({ isSelected: willBeSelected }) {
        const { isSelected } = this.props;
        return isSelected !== willBeSelected;
    }

    handleClick() {
        this.props.selectItem(Help.itemName);
        this.context.router.history.push('/help');
    }

    render() {
        const { isSelected } = this.props;
        return (
            <MenuItem
                isSelected={isSelected}
                itemName={Help.itemName}
                onClick={this.handleClick}
            />
        );
    }
}

export default Help;
