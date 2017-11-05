import Tabs from './tabs';

export default class Button {
    static async toggleGlow({ isEnabled, isDangerous, isPolicyViolated, tabId }) {
        const tab = await Tabs.get(Number(tabId));

        if (tab) {
            let iconName;

            if (isDangerous) {
                iconName = 'duck_red';
            } else if (isPolicyViolated) {
                iconName = 'duck_orange';
            } else if (isEnabled) {
                iconName = 'duck_green';
            } else {
                iconName = 'duck';
            }

            chrome.browserAction.setIcon({
                tabId: Number(tabId),
                path: `img/${iconName}.png`
            });
        }
    }

    static addOnClickListener(fn) {
        chrome.browserAction.onClicked.addListener(fn);
    }
}
