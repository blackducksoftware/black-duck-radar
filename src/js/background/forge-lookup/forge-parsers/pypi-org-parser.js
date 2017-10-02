import DomForgeParser from './dom-forge-parser';

class PypiOrgParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'pypi',
                forgeSeparator: '/',
                hubSeparator: '/',
                nameQuery: 'div.package-header h1',
                versionQuery: 'div.package-header h1'
            }
        );

        super(opts);
    }

    async getComponentKeys() {
        const componentText = await this.getComponentText();
        if (componentText.nameText) {
            const nameVersionArray = componentText.nameText.split(' ');
            const [name, version] = nameVersionArray;
            const kbReleaseForgeId = [name, version].join(this.forgeSeparator);
            const hubExternalId = encodeURI(kbReleaseForgeId);
            return this.createComponentKeys({
                name,
                version,
                kbReleaseForgeId,
                hubExternalId
            });
        }
    }
}

export default PypiOrgParser;
