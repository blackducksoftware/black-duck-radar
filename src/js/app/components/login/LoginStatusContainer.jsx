import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    performHubLogoutAlias,
    openHubLoginWindowAlias
} from 'app/store/actions/alias-actions';
import Tab from 'app/models/tab';
import styles from 'css/login-button';
import { selectMenuItem } from 'app/store/actions/menu';
import Profile from 'app/components/menu/Profile';

class LoginStatusContainer extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    };

    static propTypes = {
        hubUsername: PropTypes.string,
        isHubConnected: PropTypes.bool,
        performHubLogout: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        openHubLoginWindow: PropTypes.func.isRequired
    };

    static defaultProps = {
        hubOrigin: '',
        hubUsername: '',
        isHubConnected: false,
        selectItem: () => {}
    };

    constructor(props) {
        super(props);
        this.displayLogin = this.displayLogin.bind(this);
        this.performLogout = this.performLogout.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate(nextProps) {
        // check if a login or logout has occurred.
        if ((!this.props.isHubConnected && nextProps.isHubConnected)
           || (this.props.isHubConnected && !nextProps.isHubConnected)) {
            //changing to logged in go to profile screen
            this.context.router.history.push('/profile');
            this.props.selectItem(Profile.itemName);
        }
    }

    performLogout() {
        const { performHubLogout } = this.props;
        performHubLogout();
    }

    displayLogin() {
        this.props.openHubLoginWindow({
            parentId: Tab.getId(),
            parentTop: window.screenTop,
            parentLeft: window.screenLeft,
            parentWidth: window.innerWidth,
            parentHeight: window.innerHeight
        });
    }

    render() {
        const { isHubConnected, hubUsername } = this.props;
        if (isHubConnected) {
            return (
                <div className={styles.loginBlock}>
                    <div className={styles.logoutInputContainer}>
                        <button className={styles.logoutButton} onClick={this.performLogout}>
                            <img
                                className={styles.profileImage}
                                src='https://avatars2.githubusercontent.com/u/431461?v=3&amp;s=20'
                                width='20'
                                height='20'
                                alt='Profile Image for user'
                            />
                            <span className={styles.logoutButtonText}> { hubUsername } </span>
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div className={styles.loginBlock}>
                <div className={styles.textBlock}>
                    <div className={styles.textItem}>
                        <button className={styles.loginLink} onClick={this.displayLogin}>LOG IN</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ hubOrigin, hubUsername, hubConnectionState }) => {
    const { isHubConnected } = hubConnectionState;

    return {
        hubOrigin,
        hubUsername,
        isHubConnected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        performHubLogout: () => { dispatch(performHubLogoutAlias()); },
        openHubLoginWindow: (parentDimensions) => { dispatch(openHubLoginWindowAlias(parentDimensions)); },
        selectItem: (itemName) => { dispatch(selectMenuItem(itemName)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);
