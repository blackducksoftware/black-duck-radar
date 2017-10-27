import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { connect } from 'react-redux';
import Tab from 'app/models/tab';
import {
    refreshComponentAlias
} from 'app/store/actions/alias-actions';

class Profile extends Component {
    static itemName = 'PROFILE';

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        isSelected: PropTypes.bool,
        selectItem: PropTypes.func.isRequired,
        refreshComponent: PropTypes.func.isRequired
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
        this.props.selectItem(Profile.itemName);
        this.context.router.history.push('/profile');
        const { refreshComponent } = this.props;
        refreshComponent();
    }

    render() {
        const { isSelected } = this.props;
        return (
            <MenuItem
                isSelected={isSelected}
                itemName={Profile.itemName}
                onClick={this.handleClick}
            />
        );
    }
}

const mapStateToProps = () => { };

const mapDispatchToProps = (dispatch) => {
    const tabId = Tab.getId();
    return {
        refreshComponent: () => {
            dispatch(refreshComponentAlias(tabId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
