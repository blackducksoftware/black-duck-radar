import ForgeParser from './forge-parser';

const packagesPath = '/pypi/';

class PypiParser extends ForgeParser {
    constructor(opts) {
        super(Object.assign({}, opts, {
            forgeName: 'pypi',
            forgeSeparator: '/',
            hubSeparator: '/'
        }));
    }

    getComponentKeys() {
        const { pathname = '' } = this.forgeUrl;
        const decodedPath = decodeURI(pathname);

        if (!decodedPath || !decodedPath.includes(packagesPath)) {
            return false;
        }

        const kbReleaseForgeId = decodedPath.replace(packagesPath, '');
        const [name, version] = kbReleaseForgeId.split(this.hubSeparator);

        if (!name || !version) {
            return false;
        }

        const hubExternalId = encodeURI(kbReleaseForgeId);

        return this.createComponentKeys({
            name,
            version,
            kbReleaseForgeId,
            hubExternalId
        });
    }
}

export default PypiParser;
