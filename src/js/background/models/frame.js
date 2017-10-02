import * as store from '../store';
import { load, unload } from '../store/actions/app';
import { showFrame, hideFrame } from 'shared/actions/app';
import { loadEnum } from 'shared/constants';

class Frame {
    constructor({ url, id }) {
        this.tabId = id;
        this.tabUrl = url;
    }

    toggleVisibility() {
        const isVisible = store.getState('frameVisibilityMap', this.tabId);
        const action = isVisible ? hideFrame(this.tabId) : showFrame(this.tabId);
        return store.dispatch(action);
    }

    hideFrame() {
        return store.dispatch(hideFrame(this.tabId));
    }

    unload() {
        const { tabId } = this;
        return store.dispatch(unload({ tabId }));
    }

    load() {
        const { tabId, tabUrl } = this;
        const componentKeys = store.getState('forgeComponentKeysMap', tabUrl);
        return store.dispatch(load({
            tabId,
            componentKeys
        }));
    }

    isInserted() {
        const { status } = store.getState('loadStateMap', this.tabId) || {};
        return status === loadEnum.LOADED || status === loadEnum.LOADING;
    }
}

export default Frame;
