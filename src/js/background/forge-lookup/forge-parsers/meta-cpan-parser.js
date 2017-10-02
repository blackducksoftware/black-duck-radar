import DomForgeParser from './dom-forge-parser';

class MetaCpanParser extends DomForgeParser {
    constructor(_opts) {
        const opts = Object.assign(
            {},
            _opts,
            {
                forgeName: 'cpan',
                forgeSeparator: '/',
                hubSeparator: '/',
                nameQuery: 'div.pod.content.anchors p',
                versionQuery: 'div.main-content ul.nav-list.slidepanel.sticky-panel-top span[itemprop=softwareVersion]'
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

export default MetaCpanParser;
