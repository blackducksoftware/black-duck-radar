import ForgeParser from "./forge-parser";
import DomForgeParser from "./dom-forge-parser";

class ArtifactoryForgeParser extends DomForgeParser {
    constructor(opts) {
        super(opts);
        this.forgeQuery = opts.forgeQuery;
        this.forgeMap = opts.forgeMap;
    }

    async getComponentKeys() {
        const queryObject = {
            nameQuery: this.nameQuery,
            versionQuery: this.versionQuery,
            forgeQuery: this.forgeQuery
        };
        const componentText = await this.getComponentText(queryObject);
        if (DEBUG_AJAX) {
            console.log('ARTIFACTORY FORGE PARSER: %s - parsed component text %s', JSON.stringify(componentText));
        }
        let name = componentText.nameText;
        let version = componentText.versionText;
        if (name) {
            if (this.nameHasVersion) {
                const nameVersionArray = componentText.nameText.split(this.nameVersionDelimeter);
                const [artifactName, artifactVersion] = nameVersionArray;
                name = artifactName.trim();
                version = artifactVersion.trim();
            }

            const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
            const hubExternalId = encodeURI([name, version].join(this.blackDuckSeparator));
            if (DEBUG_AJAX) {
                console.log('DOM FORGE PARSER: %s - name: %s, version: %s, kbID: %s, externalID: %s', this.forgeName, name, version, kbReleaseForgeId, hubExternalId);
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

export default ArtifactoryForgeParser;
