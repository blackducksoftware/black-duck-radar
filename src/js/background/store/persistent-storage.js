import { STORE_NS } from 'shared/constants';

export default class PersistentStorage {
    static getState() {
        const promise = new Promise(resolve => {
            chrome.storage.sync.get(STORE_NS, (items) => {
                const state = items[STORE_NS];
                if (state) {
                    resolve(JSON.parse(state));
                } else {
                    resolve({});
                }
            });
        });

        return promise
            .catch(err => {
                console.warn('Failed to retrieve persisted data', err);
            });
    }

    static setState(data) {
        const wrappedData = {
            [STORE_NS]: JSON.stringify(data)
        };
        const promise = new Promise((resolve, reject) => {
            chrome.storage.sync.set(wrappedData, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }
                resolve();
            });
        });

        return promise
            .catch(err => {
                console.warn('Persistent storage failed to save:', err);
            });
    }
}
