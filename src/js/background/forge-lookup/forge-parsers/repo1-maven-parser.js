import MavenParser from './maven-parser';

class RepoMavenCentralParser extends MavenParser {
    constructor(opts) {
        super(Object.assign({}, opts, { artifactComponent: '/maven2/' }));
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        return super.getComponentKeys(decodeURI(pathname));
    }

    findGavByArtifactDetails(urlFragment) {
        const fragmentArray = urlFragment.split('/');
        if (fragmentArray && fragmentArray.length > 3) {
            const length = fragmentArray.length;
            const version = fragmentArray[length - 2];
            if (version) {
                const artifact = fragmentArray[length - 3];
                let group = '';
                if (length === 4) {
                    group = fragmentArray[0];
                } else {
                    group = fragmentArray.slice(0, length - 3).join('.');
                }
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
            return false;
        }
        return false;
    }
}

export default RepoMavenCentralParser;
