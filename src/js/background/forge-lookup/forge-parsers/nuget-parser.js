import DomForgeParser from './dom-forge-parser';

class NugetParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'nuget',
                forgeSeparator: '/',
                hubSeparator: '/',
                nameQuery: 'div.package-title h1',
                versionQuery: 'div.package-title h1 small'
            }
        );

        super(opts);
    }

    async getComponentKeys() {
        const componentText = await this.getComponentText();
        let name = componentText.nameText;
        const version = componentText.versionText;
        const versionIndex = name.indexOf(version);
        if (versionIndex !== -1) {
            name = name.substring(0, versionIndex).trim();
        }
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

export default NugetParser;
