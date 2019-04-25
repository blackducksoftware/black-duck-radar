/*
 *  black-duck-radar
 *
 *  Copyright (c) 2019 Synopsys, Inc.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements. See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership. The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied. See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayOptionsPage, openHubLoginWindowAlias, performHubLogoutAlias } from 'app/store/actions/alias-actions';
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
        selectItem: () => {
        },
        status: loginEnum.NOT_CONFIGURED
    };

    constructor(props) {
        super(props);
        this.displayConfiguration = this.displayConfiguration.bind(this);
        this.displayLogin = this.displayLogin.bind(this);
        this.performLogout = this.performLogout.bind(this);
        const { status } = props;
        const newStatus = this.getStatus({ status });
        if (newStatus) {
            this.state = { status: newStatus };
        } else {
            this.state = { status: loginEnum.NOT_CONFIGURED };
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate() {
        // check if a login or logout has occurred.
        if (this.props.isBlackduckConfigured) {
            //changing to logged in go to profile screen
            this.context.router.history.push('/profile');
            this.props.selectItem(Profile.itemName);
        }

        const { status } = this.props;
        if (this.state.status !== status) {
            const newStatus = this.getStatus({ status });
            if (newStatus) {
                this.setState({ status: newStatus });
            }
        }
    }

    getStatus({ status }) {
        switch (status) {
            case loginEnum.CONFIGURED:
            case loginEnum.INVALID_CONFIG:
            case loginEnum.NOT_CONFIGURED: {
                return status;
            }
            default: {
                return null;
            }
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
        const { status } = this.state;
        switch (status) {
            case loginEnum.CONFIGURED: {
                return styles.configurationConnected;
            }
            case loginEnum.INVALID_CONFIG: {
                return styles.configurationInvalid;
            }
            case loginEnum.NOT_CONFIGURED:
            default: {
                return styles.configurationDisconnected;
            }
        }
    }

    getButtonText() {
        const { status } = this.state;
        switch (status) {
            case loginEnum.CONFIGURED: {
                return 'Configured';
            }
            case loginEnum.INVALID_CONFIG: {
                return 'Invalid Configuration';
            }
            case loginEnum.NOT_CONFIGURED:
            default: {
                return 'Not Configured';
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
        displayOptionsPage: () => {
            dispatch(displayOptionsPage());
        },
        performHubLogout: () => {
            dispatch(performHubLogoutAlias());
        },
        openHubLoginWindow: (parentDimensions) => {
            dispatch(openHubLoginWindowAlias(parentDimensions));
        },
        selectItem: (itemName) => {
            dispatch(selectMenuItem(itemName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);
