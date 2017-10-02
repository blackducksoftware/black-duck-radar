import 'css/global';
import React from 'react';
import initialEntries from './history';
import { syncStore } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { HOST_ID } from 'shared/constants';
import AppContainer from './components/AppContainer';

// Initialize application
(async () => {
    const store = await syncStore();
    const host = document.getElementById(HOST_ID);

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <AppContainer />
            </MemoryRouter>
        </Provider>,
        host
    );
})();
