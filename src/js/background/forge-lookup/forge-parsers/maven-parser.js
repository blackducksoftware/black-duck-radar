import ForgeParser from './forge-parser';

class MavenParser extends ForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts, {
            forgeName: 'maven',
            forgeSeparator: ':',
            hubSeparator: ':'
        }));
        this.artifactComponent = '/artifact/';
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        const urlFragment = decodeURI(pathname);
        if (urlFragment.includes(this.artifactComponent)) {
            return this.findGavByArtifactDetails(urlFragment.replace(this.artifactComponent, ''));
        }

        return false;
    }

    findGavByArtifactDetails(urlFragment) {
        const [group, artifact, version] = urlFragment.split('/');
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

export default MavenParser;
