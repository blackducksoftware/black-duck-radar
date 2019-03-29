import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    displayOptionsPage,
    performHubLogoutAlias,
    openHubLoginWindowAlias
} from 'app/store/actions/alias-actions';
import { loginEnum } from 'shared/constants';
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
        isBlackduckConfigured: PropTypes.bool,
        displayOptionsPage: PropTypes.func.isRequired,
        performHubLogout: PropTypes.func.isRequired,
        selectItem: PropTypes.func.isRequired,
        status: PropTypes.number,
        openHubLoginWindow: PropTypes.func.isRequired
    };

    static defaultProps = {
        isBlackduckConfigured: false,
        selectItem: () => {},
        status: loginEnum.DISCONNECTED
    };

    constructor(props) {
        super(props);
        this.displayConfiguration = this.displayConfiguration.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.performLogout = this.performLogout.bind(this);
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

    displayConfiguration() {
        this.props.displayOptionsPage();
    }
    getTextClass() {
        const { status } = this.props;
        switch (status) {
            case loginEnum.CONNECTED: {
                return styles.configurationConnected;
            }
            case loginEnum.INVALID_CONFIG: {
                return styles.configurationInvalid;
            }
            case loginEnum.DISCONNECTED:
            default: {
                return styles.configurationDisconnected;
            }
        }
    }

    getButtonText() {
        const { status } = this.props;
        switch (status) {
            case loginEnum.CONNECTED: {
                return 'Configured';
            }
            case loginEnum.INVALID_CONFIG: {
                return 'Invalid Configuration';
            }
            case loginEnum.DISCONNECTED:
            default: {
                return 'Not Configured'
            }
        }
    }

    render() {
        const textClasses = this.getTextClass();
        const buttonText = this.getButtonText();
        return (
            <div className={styles.loginBlock}>
                <div className={styles.textBlock}>
                    <div className={styles.textItem}>
                        <button className={styles.loginLink} onClick={this.displayConfiguration}>
                            <span className={textClasses} aria-hidden='true'>
                                {buttonText}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ blackduckConfiguredState }) => {
    const { isBlackduckConfigured, status } = blackduckConfiguredState;

    return {
        status,
        isBlackduckConfigured
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayOptionsPage: () => { dispatch(displayOptionsPage()); },
        performHubLogout: () => { dispatch(performHubLogoutAlias()); },
        openHubLoginWindow: (parentDimensions) => { dispatch(openHubLoginWindowAlias(parentDimensions)); },
        selectItem: (itemName) => { dispatch(selectMenuItem(itemName)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);
