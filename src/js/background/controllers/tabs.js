import { buildPreloadScript } from 'scripts/preload';

export default class Tabs {
    static addUpdateListener(handler) {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            handler(tab, changeInfo);
        });
    }

    static addActivationListener(handler) {
        chrome.tabs.onActivated.addListener(async ({ tabId }) => {
            const tab = await Tabs.get(tabId);
            if (tab) {
                handler(tab, { isActivated: true });
            }
        });
    }

    static get(tabId) {
        const promise = new Promise((resolve, reject) => {
            chrome.tabs.get(Number(tabId), (tab) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                    return;
                }
                resolve(tab);
            });
        });

        return promise
            .catch(err => {
                console.warn('Tab id not found:', err);
                return null;
            });
    }

    static getActive() {
        const promise = new Promise((resolve, reject) => {
            chrome.tabs.query({
                active: true
            }, ([activeTab]) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                    return;
                }
                resolve(activeTab);
            });
        });

        return promise
            .catch(err => {
                console.warn('Active tab not found:', err);
                return {};
            });
    }

    static loadApp({ tabId, componentKeys }) {
        const file = 'app.min.js';
        const code = buildPreloadScript({
            tabId,
            componentKeys
        });

        return new Promise(resolve => {
            chrome.tabs.executeScript(Number(tabId), { code });
            chrome.tabs.executeScript(Number(tabId), { file }, resolve);
        });
    }

    static unmountFrame(tabId) {
        const file = 'unload.min.js';

        return new Promise(resolve => {
            chrome.tabs.executeScript(Number(tabId), { file }, resolve);
        });
    }

    static create(opts) {
        return new Promise((resolve) => {
            chrome.tabs.create(opts, resolve);
        });
    }
}
