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

function saveOptions() {
    const blackduckUrl = document.getElementById('blackduckUrl');
    const blackduckApiToken = document.getElementById('blackduckApiToken');
    if (blackduckUrl && blackduckApiToken) {
        chrome.storage.local.set({
            blackduckUrl: blackduckUrl.value,
            blackduckApiToken: blackduckApiToken.value
        }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        });

        const permissionUrl = new URL(blackduckUrl.value).href;
        console.log('permission URL', permissionUrl);
        chrome.permissions.request({
            origins: [permissionUrl]
        }, (granted) => {
            console.log('granted', granted);
            if (granted) {
                const status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(() => {
                    status.textContent = '';
                }, 750);
            } else {
                const status = document.getElementById('status');
                status.textContent = 'Url is not permitted';
            }
        });
    }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.local.get({
        blackduckUrl: '',
        blackduckApiToken: ''
    }, (items) => {
        const urlElement = document.getElementById('blackduckUrl');
        if (urlElement) {
            urlElement.value = items.blackduckUrl;
        }
        const tokenElement = document.getElementById('blackduckApiToken');
        if (tokenElement) {
            tokenElement.value = items.blackduckApiToken;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
const saveElement = document.getElementById('submit');
saveElement.addEventListener('click', saveOptions);
