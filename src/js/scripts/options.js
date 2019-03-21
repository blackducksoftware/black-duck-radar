function saveOptions() {
    const blackduck_url = document.getElementById('blackduckUrl');
    const blackduck_api_token = document.getElementById('blackduckApiToken');
    if(blackduck_url && blackduck_api_token) {
        chrome.storage.sync.set({
                blackduckUrl: blackduck_url.value,
                blackduckApiToken: blackduck_api_token.value
            }, function () {
                var status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(function () {
                    status.textContent = '';
                }, 750);
            }
        );
    }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    chrome.storage.sync.get({
        blackduckUrl: '',
        blackduckApiToken: ''
    }, function (items) {
        const urlElement = document.getElementById('blackduckUrl');
        if(urlElement) {
            urlElement.value = items.blackduckUrl;
        }
        const tokenElement = document.getElementById('blackduckApiToken');
        if(tokenElement) {
            tokenElement.value = items.blackduckApiToken;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
const saveElement = document.getElementById('submit');
saveElement.addEventListener('click', saveOptions);
