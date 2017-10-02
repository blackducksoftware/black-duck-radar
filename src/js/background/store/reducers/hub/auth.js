import {
    HUB_ORIGIN_SET,
    HUB_USERNAME_SET,
    HUB_AUTH_STATE_SET,
    HUB_LOGIN_WINDOW_SET
} from 'shared/actions/types';

import { loginEnum } from 'shared/constants';

export const hubUsername = (state = '', action) => {
    const { username, type } = action;

    switch (type) {
        case HUB_USERNAME_SET:
            return username;

        default:
            return state;
    }
};

export const hubOrigin = (state = '', action) => {
    const { origin, type } = action;

    switch (type) {
        case HUB_ORIGIN_SET:
            return origin;

        default:
            return state;
    }
};

export const hubConnectionState = (state = {}, action) => {
    const { type, status } = action;

    switch (type) {
        case HUB_AUTH_STATE_SET:
            return {
                status,
                isHubConnected: status === loginEnum.CONNECTED
            };

        default:
            return state;
    }
};

export const isHubLoginOpen = (state = false, action) => {
    const { type, isOpen } = action;

    switch (type) {
        case HUB_LOGIN_WINDOW_SET:
            return isOpen;

        default:
            return state;
    }
};
