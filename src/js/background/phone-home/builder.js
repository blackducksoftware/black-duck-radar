import { PHONE_HOME_MAX_META_DATA_CHARACTERS, PHONE_HOME_CLIENT_ID_NAMESPACE } from '../../shared/constants';
import uuidv3 from 'uuid/v3';

class PhoneHomeRequestBodyBuilder {
    constructor() {
        this.customerId = '';
        this.hostName = '';
        this.artifactId = '';
        this.artifactVersion = '';
        this.productId = '';
        this.productVersion = '';
        this.metaData = {};
    }

    charactersInMetaDataMap({ key, value }) {
        const mapEntryWrappingCharacters = 6;
        const mapAsString = JSON.stringify(this.metaData);
        return mapEntryWrappingCharacters + mapAsString.length() + key.length() + value.length();
    }

    addToMetaData(data) {
        if (this.charactersInMetaDataMap(data) < PHONE_HOME_MAX_META_DATA_CHARACTERS) {
            const { key, value } = data;
            this.metaData = Object.assign({}, this.metaData, {
                [key]: value
            });
            return true;
        }
        return false;
    }

    validateRequiredParam(param) {
        if (!param || param.length <= 0) {
            throw new Error(`Required parameter '${param}' is not set`);
        }
    }

    generateClientId() {
        return uuidv3(this.customerId, PHONE_HOME_CLIENT_ID_NAMESPACE);
    }

    build() {
        this.validateRequiredParam(this.customerId);
        this.validateRequiredParam(this.artifactId);
        this.validateRequiredParam(this.artifactVersion);
        this.validateRequiredParam(this.productId);
        this.validateRequiredParam(this.productVersion);
        const data = Object.assign({}, {
            v: '1',
            t: 'pageview',
            cid: `${this.generateClientId()}`,
            tid: 'UA-116682967-1',
            dp: 'phone-home',
            cd1: this.customerId,
            cd2: this.artifactId,
            cd3: this.artifactVersion,
            cd4: this.productId,
            cd5: this.productVersion,
            cd6: JSON.stringify(this.metaData),
            cd7: this.hostName
        });
        return data;
    }
}
export default PhoneHomeRequestBodyBuilder;
