import DomForgeParser from "./dom-forge-parser";
import { getForgeName } from "../../store/actions/hub-component";

class ArtifactoryForgeParser extends DomForgeParser {
    constructor(opts) {
        super(opts);
        this.forgeQuery = opts.forgeQuery;
        this.forgeMap = opts.forgeMap;
        this.forgeTabIndex = opts.forgeTabIndex;
    }

    async getComponentKeys() {
        const forgeQueryObject = {
            forgeQuery: this.forgeQuery,
            forgeTabIndex: this.forgeTabIndex
        };
        const forgeText = await this.getForgeText(forgeQueryObject);
        if (DEBUG_AJAX) {
            console.log('ARTIFACTORY FORGE PARSER: parsed forge text %s', JSON.stringify(forgeText));
        }

        const forgeData = this.getForgeData(forgeText);
        if (forgeData) {
            this.forgeName = forgeData.name;
            const componentQueryObject = {
                tableQuery: forgeData.tableQuery,
                nameIndex: forgeData.nameIndex,
                versionIndex: forgeData.versionIndex
            };
            const componentText = await this.getComponentText(componentQueryObject);
            const name = componentText.nameText;
            const version = componentText.versionText;
            if (name && version) {
                const nameVersionArray = [name.trim(), version.trim()];
                const kbReleaseForgeId = nameVersionArray.join(forgeData.forgeSeparator);
                const hubExternalId = encodeURI(nameVersionArray.join(forgeData.blackDuckSeparator));
                if (DEBUG_AJAX) {
                    console.log('ARTIFACTORY FORGE PARSER: %s - name: %s, version: %s, kbID: %s, externalID: %s', forgeData.name, name, version, kbReleaseForgeId, hubExternalId);
                }
                return this.createComponentKeys({
                    name,
                    version,
                    kbReleaseForgeId,
                    hubExternalId
                });
            }
        }
    }

    getForgeData({forgeText}) {
        const forgeFromMap = this.forgeMap[forgeText];
        if(forgeFromMap) {
            return forgeFromMap;
        }
        return null;
    }

    getForgeText(queryObject) {
        const code = this.buildForgeParserScript(queryObject);

        return new Promise((resolve, reject) => {
            const listener = (request, sender) => {
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    forgeElementMissing,
                    extensionId,
                    forgeText
                } = request;

                if (DEBUG_AJAX) {
                    console.log("ARTIFACTORY FORGE PARSER - Forge Parser script request: ", request);
                }

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }
                chrome.runtime.onMessage.removeListener(listener);

                if (error) {
                    const message = `Failed to fetch component text, forgeMissing: ${forgeElementMissing}`;
                    if (DEBUG_AJAX) {
                        console.log(message);
                    }
                    reject(new Error(message));
                    return;
                }

                resolve({
                    forgeText
                });
            };

            chrome.runtime.onMessage.addListener(listener);
            chrome.tabs.executeScript(Number(this.tabId), { code });
        });
    }

    getComponentText(queryObject) {
        const code = this.buildTabParserScript(queryObject);

        return new Promise((resolve, reject) => {
            const listener = (request, sender) => {
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    nameElementMissing,
                    versionElementMissing,
                    extensionId,
                    nameText,
                    versionText,
                } = request;
                if (DEBUG_AJAX) {
                    console.log("ARTIFACTORY FORGE PARSER - Component Parser script request: ", request);
                }

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }
                chrome.runtime.onMessage.removeListener(listener);

                if (error) {
                    const message = `Failed to fetch component text, nameMissing: ${nameElementMissing}, versionMissing: ${versionElementMissing}`;
                    if (DEBUG_AJAX) {
                        console.log(message);
                    }
                    reject(new Error(message));
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

    buildForgeParserScript({ forgeQuery, forgeTabIndex }) {
        return `
        (() => {
            const forgeElements = document.querySelectorAll('${forgeQuery}');

            if (!forgeElements) {
                chrome.runtime.sendMessage({ 
                    forgeElementMissing: !forgeElements,
                    error: true 
                });
                return;
            }
            const message = {
                 extensionId: '${chrome.runtime.id}',
                 forgeText: forgeElements[${forgeTabIndex}].innerText
             };
             
             chrome.runtime.sendMessage(message);
        })();
    `;
    }

    buildTabParserScript({ tableQuery, nameIndex, versionIndex }) {
        return `
        (() => {
            const tableElements = document.querySelectorAll("${tableQuery}");

            if (!tableElements) {
                chrome.runtime.sendMessage({ 
                    tableElementMissing: !tableElements,
                    error: true 
                });
                return;
            }
            const nameElement = tableElements[${nameIndex}];
            const versionElement = tableElements[${versionIndex}];
            
            if (!nameElement || !versionElement) {
                chrome.runtime.sendMessage({ 
                    nameElementMissing: !nameElement,
                    versionElementMissing: !versionElement,
                    error: true 
                });
                return;
            }
            
            const message = {
                 extensionId: '${chrome.runtime.id}',
                 nameText: nameElement.innerText,
                 versionText: versionElement.innerText
             };
             
             chrome.runtime.sendMessage(message);
        })();
    `;
    }
}

export default ArtifactoryForgeParser;
