import DomForgeParser from './dom-forge-parser';

class NpmParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'npmjs',
                forgeSeparator: '/',
                hubSeparator: '/',
                nameQuery: 'div.content-column h1.package-name a',
                versionQuery: 'div.sidebar ul.box li:nth-child(2) strong'
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

export default NpmParser;
