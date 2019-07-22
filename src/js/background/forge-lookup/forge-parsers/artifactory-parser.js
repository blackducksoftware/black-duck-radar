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
        const queryObject = {
            nameQuery: this.nameQuery,
            versionQuery: this.versionQuery,
            forgeQuery: this.forgeQuery,
            forgeTabIndex: this.forgeTabIndex
        };
        const componentText = await this.getComponentText(queryObject);
        if (DEBUG_AJAX) {
            console.log('ARTIFACTORY FORGE PARSER: %s - parsed component text %s', JSON.stringify(componentText));
        }
        let name = componentText.nameText;
        let version = componentText.versionText;
        const forgeData = this.getForgeData(componentText);
        if (forgeData && name) {
            const {nameText} = componentText;
            this.forgeName = forgeData.name;
            const extensionIndex = nameText.lastIndexOf(".");
            const versionEndIndex = extensionIndex >= 0 ? extensionIndex : nameText.length;
            const nameEndIndex = nameText.lastIndexOf(forgeData.nameVersionDelimeter);
            const artifactName = nameText.substring(0, nameEndIndex);
            const artifactVersion =  nameText.substring(nameEndIndex +1, versionEndIndex);
            name = artifactName.trim();
            version = artifactVersion.trim();

            const kbReleaseForgeId = [name, version].join(forgeData.forgeSeparator);
            const hubExternalId = encodeURI([name, version].join(forgeData.blackDuckSeparator));
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

    getForgeData({forgeText}) {
        const forgeFromMap = this.forgeMap[forgeText];
        if(forgeFromMap) {
            return forgeFromMap;
        }
        return {
            name: 'maven',
            forgeSeparator: ":",
            blackDuckSeparator: ":"
        };
    }

    getComponentText(queryObject) {
        const code = this.buildParserScript(queryObject);

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
                    forgeText
                } = request;

                if (DEBUG_AJAX) {
                    console.log("ARTIFACTORY FORGE PARSER - Parser script request: ", request);
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
                    versionText,
                    forgeText
                });
            };

            chrome.runtime.onMessage.addListener(listener);
            chrome.tabs.executeScript(Number(this.tabId), { code });
        });
    }

    buildParserScript({ nameQuery, versionQuery, forgeQuery, forgeTabIndex }) {
        return `
        (() => {
            const nameElement = document.querySelector('${nameQuery}');
            const versionElement = document.querySelector('${versionQuery}');
            const forgeElements = document.querySelectorAll('${forgeQuery}');

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
                 versionText: versionElement.innerText,
                 forgeText: null
             };
             
             if(forgeElements && forgeElements.length > 2) {
                message.forgeText = forgeElements[${forgeTabIndex}].innerText;
             }
             
             chrome.runtime.sendMessage(message);
        })();
    `;
    }
}

export default ArtifactoryForgeParser;
