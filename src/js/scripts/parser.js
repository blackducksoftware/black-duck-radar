export const buildParserScript = ({ nameQuery, versionQuery }) => {
    return `
        (() => {
            const nameElement = document.querySelector('${nameQuery}');
            const versionElement = document.querySelector('${versionQuery}');
            
            if (!nameElement || !versionElement) {
                chrome.runtime.sendMessage({ error: true });
                return;
            }

             chrome.runtime.sendMessage({
                 extensionId: '${chrome.runtime.id}',
                 nameText: nameElement.innerText,
                 versionText: versionElement.innerText
             });
        })();
    `;
};
