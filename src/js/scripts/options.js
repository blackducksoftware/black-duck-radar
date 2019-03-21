function saveOptions() {
    const blackduckUrl = document.getElementById('blackduckUrl');
    const blackduckApiToken = document.getElementById('blackduckApiToken');
    if (blackduckUrl && blackduckApiToken) {
        chrome.storage.sync.set({
            blackduckUrl: blackduckUrl.value,
            blackduckApiToken: blackduckApiToken.value
        }, () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        });
    }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({
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
