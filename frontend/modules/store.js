import createUnistore from 'unistore';
import devtools from 'unistore/devtools';

/**
 * Exports the store with the default state
 *
 * @return {any}
 */
const createStore = () => {
    const initialState = {
        search: '',
        online: typeof window !== "undefined" && typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true,
        clientWidth: typeof document !== "undefined" ? document.body.clientWidth : 1000, //todo fix
        snackbar: {
            active: false,
            children: null
        }
    };

    return typeof window === "undefined" || process.env.NODE_ENV === 'production' ? createUnistore(initialState) : devtools(createUnistore(initialState));
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
