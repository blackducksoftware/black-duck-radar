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

        return new Promise((resolve, reject) => {
            chrome.tabs.executeScript(Number(tabId), { file }, () => {
                const { message } = chrome.runtime.lastError || {};
                if (!message || message.includes('No tab with id')) {
                    resolve();
                }
                reject();
            });
        });
    }

    static create(opts) {
        return new Promise((resolve) => {
            chrome.tabs.create(opts, resolve);
        });
    }
}
