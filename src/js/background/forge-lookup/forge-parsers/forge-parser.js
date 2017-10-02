class ForgeParser {
    constructor({ forgeName, forgeSeparator, hubSeparator, url }) {
        this.forgeName = forgeName;
        this.forgeSeparator = forgeSeparator;
        this.hubSeparator = hubSeparator;
        this.forgeUrl = url;
    }

    getComponentKeys() {
        console.warn('getComponentKeys should be overridden.');
        return false;
    }

    createComponentKeys(data = {}) {
        return Object.assign({
            forgeName: this.forgeName,
            // We use the hub external id to map API responses
            // to the correct React application
            internal: data.hubExternalId
        }, data);
    }
}

export default ForgeParser;
