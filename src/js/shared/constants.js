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
    DISCONNECTED: 0,
    CONNECTED: 1,
    DISCONNECTION_PENDING: 2,
    CONNECTION_PENDING: 3
};
export const loadEnum = {
    UNLOADED: 0,
    LOADED: 1,
    UNLOADING: 2,
    LOADING: 3
};
export const SYNC_PENDING = 'SYNC_PENDING';
