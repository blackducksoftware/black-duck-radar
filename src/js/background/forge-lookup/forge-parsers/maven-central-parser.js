import MavenParser from './maven-parser';

class MavenCentralParser extends MavenParser {
    constructor(opts) {
        super(Object.assign({}, opts, { artifactComponent: '#artifactdetails' }));
    }

    getComponentKeys() {
        const { hash = '', search = '' } = this.forgeUrl;
        return super.getComponentKeys(decodeURI(hash || search));
    }

    findGavByArtifactDetails(urlFragment) {
        const [, group, artifact, version] = urlFragment.split('|');
        const name = [group, artifact].join(this.forgeSeparator);

        if (!name || !version) {
            return false;
        }

        const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
        const hubExternalId = encodeURI([group, artifact, version].join(this.hubSeparator));
        return this.createComponentKeys({
            name,
            version,
            kbReleaseForgeId,
            hubExternalId
        });
    }
}

export default MavenCentralParser;
