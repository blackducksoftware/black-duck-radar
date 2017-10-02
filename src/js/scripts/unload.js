// TODO: rename this file to unmount
import { HOST_ID, APP_NS } from 'shared/constants';

const hostNode = document.getElementById(HOST_ID);

if (hostNode) {
    hostNode.remove();
}

delete window[APP_NS];
