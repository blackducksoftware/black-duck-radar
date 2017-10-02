import PhoneHomeBody from './body';

class PhoneHomeRequestBodyBuilder {
    constructor() {
        this.registrationId = '';
        this.hostName = '';
        this.blackDuckName = '';
        this.blackDuckVersion = '';
        this.thirdPartyName = '';
        this.thirdPartyVersion = '';
        this.pluginVersion = '';
        this.source = '';
    }

    build() {
        const hubIdentifier = this.registrationId;
        const infoMap = {
            blackDuckName: this.blackDuckName,
            blackDuckVersion: this.blackDuckVersion,
            thirdPartyName: this.thirdPartyName,
            thirdPartyVersion: this.thirdPartyVersion,
            pluginVersion: this.pluginVersion
        };

        return new PhoneHomeBody(hubIdentifier, 'Integrations', infoMap);
    }
}
export default PhoneHomeRequestBodyBuilder;
