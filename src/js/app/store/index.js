import { Store } from 'react-chrome-redux';
import { STORE_PORT } from 'shared/constants';

const store = new Store({
    portName: STORE_PORT
});

export const syncStore = async () => {
    // Connect to the background store
    await store.ready();

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
    store.dispatch(action);
};
