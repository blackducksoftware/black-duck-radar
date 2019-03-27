import { STORE_PORT } from 'shared/constants';
import middleware from './middleware';
import rootReducer from './reducers';
import { createStore as createReduxStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import PersistentStorage from './persistent-storage';

let store;

export const createStore = async () => {
    const initialState = {};
    store = createReduxStore(
        rootReducer,
        initialState,
        middleware
    );

    // Here we attach listeners to the store that allow the React apps
    // running in a content script to sync with store changes in the background
    wrapStore(store, { portName: STORE_PORT });

    if (DEBUG_REDUX) {
        store.subscribe(() => {
            console.log('redux state:', store.getState());
            console.log('\n');
        });
    }

    return store;
};

export const getState = (...keys) => {
    let value = store.getState();

    keys.every(key => {
        value = value[key];
        return value !== undefined;
    });

    return value;
};

export const dispatch = (action) => {
    return store.dispatch(action);
};
