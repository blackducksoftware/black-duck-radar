import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectMenuItem } from 'app/store/actions/menu';
import Tab from 'app/models/tab';
import Profile from './Profile';
import Help from './Help';
import { menuBlock } from 'css/menu';

const menuComponents = [
    Profile, Help
];

class MenuContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        selectedItem: PropTypes.string,
        selectItem: PropTypes.func
    };

    static defaultProps = {
        selectedItem: null,
        selectItem: () => {}
    };

    constructor(props) {
        super(props);
        const { selectedItem, selectItem } = props;

        if (!selectedItem) {
            // Select profile tab by default
            selectItem(Profile.itemName);
        }
    }

    getMenuItems() {
        return menuComponents.map((MenuComponent) => {
            const { itemName } = MenuComponent;
            return (
                <MenuComponent
                    key={itemName}
                    isSelected={this.isSelected(itemName)}
                    selectItem={this.props.selectItem}
                />
            );
        });
    }

    isSelected(itemName) {
        return this.props.selectedItem === itemName;
    }

    render() {
        return (
            <div className={menuBlock}>
                { this.getMenuItems() }
            </div>
        );
    }
}

const mapStateToProps = ({ menuStateMap }) => {
    const { selectedItem } = menuStateMap[Tab.getId()] || {};
    return {
        selectedItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectItem: (itemName) => { dispatch(selectMenuItem(itemName)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
