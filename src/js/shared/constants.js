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

export const APP_NS = 'BD_RADAR';
export const FRAME_ID = `${APP_NS}_FRAME`;
// HEADER_ID and ROOT_ID are hard coded in the webpack configuration and global css, so they need to be
// modified there too if necessary
export const HOST_ID = `${APP_NS}_HOST`;
export const ROOT_ID = `${APP_NS}_ROOT`;
export const HEADER_ID = `${APP_NS}_HEADER`;
export const STORE_NS = `${APP_NS}_STORE`;
export const STORE_PORT = `${STORE_NS}_PORT`;
export const VULN_SEVERITIES = [
    'High',
    'Medium',
    'Low'
];
export const loginEnum = {
    NOT_CONFIGURED: 0,
    CONFIGURED: 1,
    DISCONNECTION_PENDING: 2,
    CONFIGURATION_PENDING: 3,
    INVALID_CONFIG: 4
};
export const loadEnum = {
    UNLOADED: 0,
    LOADED: 1,
    UNLOADING: 2,
    LOADING: 3
};
export const SYNC_PENDING = 'SYNC_PENDING';
export const PHONE_HOME_MAX_META_DATA_CHARACTERS = 1536;
// matches: https://github.com/blackducksoftware/phone-home-client/blob/master/src/main/java/com/synopsys/integration/phonehome/enums/ProductIdEnum.java
export const PHONE_HOME_PRODUCT_ENUM = Object.freeze({
    BLACK_DUCK: 'BLACK_DUCK',
    CODE_CENTER: 'CODE_CENTER',
    COVERITY: 'COVERITY',
    PROTEX: 'PROTEX'
});
// DO NOT CHANGE PHONE HOME GUID for CLIENT ID
export const PHONE_HOME_CLIENT_ID_NAMESPACE = Object.freeze('5d8343f2-8940-4911-8243-ad2b60a1ae28');
