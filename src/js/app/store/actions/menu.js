import { MENU_ITEM_SELECT } from 'shared/actions/types';
import Tab from 'app/models/tab';

export const selectMenuItem = (itemName) => {
    return {
        type: MENU_ITEM_SELECT,
        tabId: Tab.getId(),
        menuState: {
            selectedItem: itemName
        }
    };
};
