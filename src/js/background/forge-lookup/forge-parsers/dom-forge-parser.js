import ForgeParser from './forge-parser';
import { buildParserScript } from 'scripts/parser';

class DomForgeParser extends ForgeParser {
    constructor(opts) {
        super(opts);
        this.nameQuery = opts.nameQuery;
        this.versionQuery = opts.versionQuery;
        this.tabId = opts.tabId;
    }

    getComponentText() {
        const code = buildParserScript({
            nameQuery: this.nameQuery,
            versionQuery: this.versionQuery
        });

        return new Promise((resolve, reject) => {
            const listener = (request, sender) => {
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    extensionId,
                    nameText,
                    versionText
                } = request;

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }
                chrome.runtime.onMessage.removeListener(listener);

                if (error) {
                    reject(new Error('Failed to fetch component text'));
                    return;
                }

                resolve({
                    nameText,
                    versionText
                });
            };

            chrome.runtime.onMessage.addListener(listener);
            chrome.tabs.executeScript(Number(this.tabId), { code });
        });
    }
}

export default DomForgeParser;
