import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    checkBlackduckConfigured,
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
        isBlackduckConfigured: PropTypes.bool,
        checkBlackduckConfigured: PropTypes.func.isRequired,
        performHubLogout: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        openHubLoginWindow: PropTypes.func.isRequired
    };

    static defaultProps = {
        blackduckOrigin: '',
        hubUsername: '',
        isBlackduckConfigured: false,
        selectItem: () => {}
    };

    constructor(props) {
        super(props);
        this.displayLogin = this.displayLogin.bind(this);
        this.performLogout = this.performLogout.bind(this);
    }

    componentDidMount() {
        this.props.checkBlackduckConfigured();
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate(nextProps) {
        // check if a login or logout has occurred.
        if ((!this.props.isBlackduckConfigured && nextProps.isBlackduckConfigured)
           || (this.props.isBlackduckConfigured && !nextProps.isBlackduckConfigured)) {
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
        const { isBlackduckConfigured, hubUsername } = this.props;
        if (isBlackduckConfigured) {
            return (
                <div className={styles.loginBlock}>
                    <div className={styles.textBlock}>
                        <div className={styles.textItem}>
                            <button className={styles.loginLink} onClick={this.displayLogin}>Connected</button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={styles.loginBlock}>
                <div className={styles.textBlock}>
                    <div className={styles.textItem}>
                        <button className={styles.loginLink} onClick={this.displayLogin}>Disconnected</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ blackduckOrigin, hubUsername, blackduckConfiguredState }) => {
    const { isBlackduckConfigured } = blackduckConfiguredState;

    return {
        blackduckOrigin,
        hubUsername,
        isBlackduckConfigured
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkBlackduckConfigured: () => { dispatch(checkBlackduckConfigured()); },
        performHubLogout: () => { dispatch(performHubLogoutAlias()); },
        openHubLoginWindow: (parentDimensions) => { dispatch(openHubLoginWindowAlias(parentDimensions)); },
        selectItem: (itemName) => { dispatch(selectMenuItem(itemName)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);
