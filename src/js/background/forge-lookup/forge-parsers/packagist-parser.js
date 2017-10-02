import DomForgeParser from './dom-forge-parser';

class PackagistParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'packagist',
                forgeSeparator: ':',
                hubSeparator: ':',
                nameQuery: 'h2.title',
                versionQuery: 'span.version-number'
            }
        );

        super(opts);
    }

    async getComponentKeys() {
        const componentText = await this.getComponentText();
        const name = componentText.nameText;
        const formattedName = name.split('-')[0].trim();
        const version = componentText.versionText;
        const kbReleaseForgeId = [formattedName, version].join(this.forgeSeparator);
        const hubExternalId = encodeURI(kbReleaseForgeId);
        return this.createComponentKeys({
            name,
            version,
            kbReleaseForgeId,
            hubExternalId
        });
    }
}

export default PackagistParser;
