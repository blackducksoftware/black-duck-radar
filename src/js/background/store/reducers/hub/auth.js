/*
 *  black-duck-radar
 *
 *  Copyright (c) 2019 Synopsys, Inc.
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements. See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership. The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied. See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

import {
    BLACKDUCK_BEARER_TOKEN_SET,
    BLACKDUCK_TOKEN_SET,
    HUB_AUTH_STATE_SET,
    HUB_LOGIN_WINDOW_SET,
    HUB_ORIGIN_SET,
    HUB_USERNAME_SET
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

export const blackduckOrigin = (state = '', action) => {
    const { origin, type } = action;

    switch (type) {
        case HUB_ORIGIN_SET:
            return origin;

        default:
            return state;
    }
};

export const blackduckToken = (state = '', action) => {
    const { token, type } = action;

    switch (type) {
        case BLACKDUCK_TOKEN_SET:
            return token;

        default:
            return state;
    }
};

export const blackduckBearerToken = (state = '', action) => {
    const { token, type } = action;

    switch (type) {
        case BLACKDUCK_BEARER_TOKEN_SET:
            return token;

        default:
            return state;
    }
};

export const blackduckConfiguredState = (state = {}, action) => {
    const { type, status } = action;

    switch (type) {
        case HUB_AUTH_STATE_SET:
            return {
                status,
                isBlackduckConfigured: status === loginEnum.CONFIGURED
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
