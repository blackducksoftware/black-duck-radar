import ForgeParser from './forge-parser';

class MavenParser extends ForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts, {
            forgeName: 'maven',
            forgeSeparator: ':',
            hubSeparator: ':'
        }));
        this.artifactComponent = opts.artifactComponent;
    }

    getComponentKeys(urlFragment = []) {
        if (urlFragment.includes(this.artifactComponent)) {
            return this.findGavByArtifactDetails(urlFragment.replace(this.artifactComponent, ''));
        }

        return false;
    }

    findGavByArtifactDetails() {
        console.warn('findGavByArtifactDetails should be overridden');
        return null;
    }
}

export default MavenParser;
