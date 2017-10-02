import { APP_NS } from 'shared/constants';

class ForgeComponent {
    static getKeys() {
        return window[APP_NS].componentKeys;
    }

    static getId() {
        const { componentKeys } = window[APP_NS];
        return componentKeys.internal;
    }
}

export default ForgeComponent;
