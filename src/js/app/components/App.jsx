import { app as appClass, appHeader } from 'css/app';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import MenuContainer from './menu/MenuContainer';
import ProfileContainer from './profile/ProfileContainer';
import HelpContainer from './help/HelpContainer';
import LoginStatusContainer from './login/LoginStatusContainer';
import { Route } from 'react-router';

const App = () => {
    return (
        <div className={appClass}>
            <Logo />
            <div className={appHeader}>
                <MenuContainer />
                <LoginStatusContainer />
            </div>
            <Route path='/profile' component={ProfileContainer} />
            <Route path='/help' component={HelpContainer} />
        </div>
    );
};

App.contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object
};

export default App;
