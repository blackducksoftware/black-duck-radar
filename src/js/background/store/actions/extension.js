import {
    CHROME_EXTENSION_DETAILS_SET
} from 'shared/actions/types';

export const setChromeExtensionDetails = ({ chromeExtensionDetails }) => {
    return {
        type: CHROME_EXTENSION_DETAILS_SET,
        chromeExtensionDetails: {
            name: chromeExtensionDetails.name,
            version: chromeExtensionDetails.version,
            description: chromeExtensionDetails.description
        }
    };
};
