import createUnistore from 'unistore';
import devtools from 'unistore/devtools';

import {getBaseRoute} from "../utils/routing";

/**
 * Exports the store with the default state
 *
 * @return {any}
 */
const createStore = () => {
    const initialState = {
        router: {
            current: getBaseRoute(),
            previous: null,
            url: window.location.pathname
        },
        search: '',
        online: typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true,
        clientWidth: document.body.clientWidth,
        snackbar: {
            active: false,
            children: null
        }
    };

    return process.env.NODE_ENV === 'production' ?  createUnistore(initialState) : devtools(createUnistore(initialState));
};

/**
 * All action for mutating the store
 *
 * @return {*}
 */
const actions = () => {
    return {
        updateSnackbar(state, payload) {
            return {
                snackbar: payload
            };
        },
        updateOnlineState(state, payload) {
            return {
                online: payload
            };
        },
        updateSearch(state, payload) {
            return {
                search: payload
            };
        },
        updateRouter(state, payload) {
            return {
                router: payload
            };
        }
    };
};

export { actions };
export default createStore();
