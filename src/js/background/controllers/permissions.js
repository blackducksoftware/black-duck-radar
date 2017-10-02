export default class Permissions {
    static requestUrl(url) {
        const permissionUrl = new URL(url).href;
        return new Promise((resolve, reject) => {
            chrome.permissions.request({
                origins: [permissionUrl]
            }, (isGranted) => {
                if (isGranted) {
                    resolve();
                    return;
                }
                reject(new Error(`Url is not permitted: ${url}`));
            });
        });
    }
}
