import { APP_NS } from 'shared/constants';

class Tab {
    static getId() {
        return window[APP_NS].tabId;
    }
}

export default Tab;
