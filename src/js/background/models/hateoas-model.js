export default class HateoasModel {
    constructor(body = {}) {
        this.body = body;
    }

    getFirstLink(relationship) {
        return this.getLinks(relationship)[0];
    }

    getLinks(relationship) {
        const { _meta = {} } = this.body;
        const { links } = _meta;
        return links
            .filter(({ rel }) => rel === relationship)
            .map(link => link.href);
    }
}
