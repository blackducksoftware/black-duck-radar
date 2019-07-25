import DomForgeParser from "./dom-forge-parser";

class ArtifactoryForgeParser extends DomForgeParser {
    constructor(opts) {
        super(opts);
        this.forgeQuery = opts.forgeQuery;
        this.forgeMap = opts.forgeMap;
        this.forgeTabIndex = opts.forgeTabIndex;
        this.defaultTabQuery = opts.defaultTabQuery;
        this.moduleIdIndex = opts.moduleIdIndex;
        this.date = Date.now();
        this.getForgeText = this.getForgeText.bind(this);
        this.getComponentText = this.getComponentText.bind(this);
        this.getForgeData = this.getForgeData.bind(this);
    }

    async getComponentKeys() {
        const forgeQueryObject = {
            forgeQuery: this.forgeQuery,
            forgeTabIndex: this.forgeTabIndex,
            defaultTabQuery: this.defaultTabQuery,
            moduleIdIndex: this.moduleIdIndex
        };

        const componentData = await this.getForgeText(forgeQueryObject);
        if (DEBUG_AJAX) {
            console.log('ARTIFACTORY FORGE PARSER - %s: parsed component text: %s', this.date, JSON.stringify(componentData));
        }
        if (componentData) {
            const name = componentData.nameText;
            const version = componentData.versionText;
            if (name && version) {
                this.forgeName = componentData.forgeName;
                const nameVersionArray = [name.trim(), version.trim()];
                const kbReleaseForgeId = nameVersionArray.join(componentData.forgeSeparator);
                const hubExternalId = encodeURI(nameVersionArray.join(componentData.blackDuckSeparator));
                if (DEBUG_AJAX) {
                    console.log('ARTIFACTORY FORGE PARSER - %s: %s - name: %s, version: %s, kbID: %s, externalID: %s', this.date, this.forgeName, name, version, kbReleaseForgeId, hubExternalId);
                }
                return this.createComponentKeys({
                    name,
                    version,
                    kbReleaseForgeId,
                    hubExternalId
                });
            }
        }
        return null;
    }

    getForgeData({forgeText, defaultTabQuery, moduleIdIndex}) {
        const forgeFromMap = this.forgeMap[forgeText];
        if(forgeFromMap) {
            return forgeFromMap;
        }
        return {
            name: 'maven',
            forgeSeparator: ":",
            blackDuckSeparator: ":",
            tableQuery: defaultTabQuery,
            nameIndex: moduleIdIndex,
            versionIndex: moduleIdIndex
        };
    }

    getForgeText(queryObject) {
        const code = this.buildForgeParserScript(queryObject);

        return new Promise((resolve, reject) => {
            const forgeListener = (request, sender) => {
                chrome.runtime.onMessage.removeListener(forgeListener);
                const { tab } = sender;
                const { id } = tab;

                const {
                    error,
                    forgeElementMissing,
                    extensionId,
                    forgeText
                } = request;

                if (DEBUG_AJAX) {
                    console.log("ARTIFACTORY FORGE PARSER %s - Forge Parser script request: ", this.date, request);
                }

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }


                if (error) {
                    const message = `Failed to fetch component text, forgeMissing: ${forgeElementMissing}`;
                    if (DEBUG_AJAX) {
                        console.log(message);
                    }
                    reject(new Error(message));
                    return;
                }

                const forgeData = this.getForgeData({
                    forgeText,
                    defaultTabQuery: queryObject.defaultTabQuery,
                    moduleIdIndex: queryObject.moduleIdIndex
                });
                if (!forgeData) {
                    reject(new Error(`Forge not found for: ${forgeText}`));
                }

                resolve(forgeData);
            };

            chrome.runtime.onMessage.addListener(forgeListener);
            chrome.tabs.executeScript(Number(this.tabId), { code });
        }).then(forgeResult => {
            const componentQueryObject = {
                forgeName: forgeResult.name,
                forgeSeparator: forgeResult.forgeSeparator,
                tableQuery: forgeResult.tableQuery,
                nameIndex: forgeResult.nameIndex,
                versionIndex: forgeResult.versionIndex
            };
            return this.getComponentText(componentQueryObject).then(componentResult => {
                return {
                    forgeName: forgeResult.name,
                    forgeSeparator: forgeResult.forgeSeparator,
                    blackDuckSeparator: forgeResult.blackDuckSeparator,
                    nameText: componentResult.nameText,
                    versionText: componentResult.versionText
                };
            }).catch(error => {
                if(DEBUG_AJAX) {
                    console.log("ARTIFACTORY FORGE PARSER %s - Error with component parser: ", this.date, error);
                }
            });
        }).catch(error => {
            if(DEBUG_AJAX) {
                console.log("ARTIFACTORY FORGE PARSER %s - Error with forge parser: ", this.date, error);
            }
        });
    }

    getComponentText(queryObject) {
        return new Promise((resolve, reject) => {
            const componentListener = (request, sender) => {
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
                    console.log("ARTIFACTORY FORGE PARSER %s - Component Parser script request: ",this.date, request);
                }

                if (id !== this.tabId) {
                    return;
                }

                if (extensionId !== chrome.runtime.id) {
                    return;
                }

                if(nameText && versionText) {
                    chrome.runtime.onMessage.removeListener(componentListener);
                    let artifactName = nameText;
                    let artifactVersion = versionText;
                    if (error) {
                        const message = `Failed to fetch component text, nameMissing: ${nameElementMissing}, versionMissing: ${versionElementMissing}`;
                        if (DEBUG_AJAX) {
                            console.log(message);
                        }
                        reject(new Error(message));
                        return;
                    }

                    if(queryObject.forgeName === 'maven') {
                        const lastSeparator = nameText.lastIndexOf(queryObject.forgeSeparator);
                        artifactName = nameText.substring(0, lastSeparator);
                        artifactVersion = nameText.substring(lastSeparator +1, nameText.length);
                    }

                    resolve({
                        nameText: artifactName,
                        versionText: artifactVersion
                    });
                }
                resolve();
            };

            const componentScript = this.buildTabParserScript(queryObject);

            chrome.runtime.onMessage.addListener(componentListener);
            chrome.tabs.executeScript(Number(this.tabId), { code: componentScript });
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
