import DomForgeParser from './dom-forge-parser';

class CocoapodsParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'cocoapods',
                forgeSeparator: ':',
                hubSeparator: ':',
                nameQuery: 'div.inline-headline h1.hidden-xs a',
                versionQuery: 'div.inline-headline h1.hidden-xs span'
            }
        );

        super(opts);
    }

    async getComponentKeys() {
        const componentText = await this.getComponentText();
        const name = componentText.nameText;
        const version = componentText.versionText;
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

export default CocoapodsParser;
