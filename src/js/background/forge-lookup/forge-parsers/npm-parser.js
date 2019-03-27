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
                nameQuery: 'div.w-100.ph0-l.ph3.ph4-m h2._30_rF.flex.flex-column.w-100.fw6.mt3.black.dib.ma0.tracked-tight.no-underline.hover-black.f3-ns span',
                versionQuery: 'div._2_OuR.dib.w-50.bb.b--black-10.pr2 p'
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
