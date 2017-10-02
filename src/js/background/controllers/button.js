import Tabs from './tabs';

export default class Button {
    static async disable(tabId) {
        const tab = await Tabs.get(tabId);
        if (tab) {
            chrome.pageAction.hide(tabId);
        }
    }

    static async enable(tabId) {
        const tab = await Tabs.get(tabId);
        if (tab) {
            chrome.pageAction.show(tabId);
        }
    }

    static async toggleGlow({ isEnabled, isDangerous, isPolicyViolated, tabId }) {
        const tab = await Tabs.get(tabId);

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

            chrome.pageAction.setIcon({
                tabId: Number(tabId),
                path: `img/${iconName}.png`
            });
        }
    }

    static addOnClickListener(fn) {
        chrome.pageAction.onClicked.addListener(fn);
    }
}
