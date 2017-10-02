import Hub from '../controllers/hub';
import ForgeLookup from '../forge-lookup';

const forgeLookup = new ForgeLookup();

class ForgeComponent {
    constructor() {
        // This key is used in the extension to map the component to its
        // hub or kb data
        this.hubController = new Hub();
    }

    async parseExternalKeys(opts) {
        const parser = forgeLookup.getForgeParser(opts);
        if (parser) {
            return parser.getComponentKeys();
        }

        return null;
    }
}

export default ForgeComponent;
