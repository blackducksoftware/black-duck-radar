import {
    HOST_ID,
    HEADER_ID,
    APP_NS
} from 'shared/constants';

export const buildPreloadScript = ({ tabId, componentKeys }) => {
    return `
        (() => {
            if (typeof ${HOST_ID} !== 'undefined') {
                console.error('Black Duck Radar is already inserted into the page');
                return;
            }

            const host = document.createElement('div');
            host.id = '${HOST_ID}';
            document.body.appendChild(host);

            const header = document.createElement('div');
            header.id = '${HEADER_ID}';
            document.head.appendChild(header);

            window['${APP_NS}'] = {
                "extensionId": "${chrome.runtime.id}",
                "tabId": "${tabId}",
                "componentKeys": ${JSON.stringify(componentKeys)}
            };
        })();
    `;
};
