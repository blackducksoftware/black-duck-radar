import ForgeParser from "./forge-parser";
import DomForgeParser from "./dom-forge-parser";

class ArtifactoryForgeParser extends DomForgeParser {
    constructor(opts) {
        super(opts);
        this.forgeQuery = opts.forgeQuery;
    }
}

export default ArtifactoryForgeParser;
