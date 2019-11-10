import './utils/polyfills';
import {h, render} from 'preact';
import {Provider} from 'unistore/preact';

import store from './modules/store';
import {validateServiceWorkerInstance} from './utils/sw';

import Router from './components/Router';

/**
 * Initialize the app
 */
validateServiceWorkerInstance("/kill-switch.txt");

/**
 * Check if search query has been send
 */
if(window.location.search.includes("?search=")) {
    const search = window.location.search.replace('?search=', '');
    store.setState({
        search
    });
}

/**
 * Check for resize events
 */
window.addEventListener("resize", () => {
    store.setState({
        clientWidth: document.body.clientWidth
    });
});

/**
 * Render the app
 */
render(<Provider store={store}><Router/></Provider>, document.querySelector('#app'));
require('preact/debug');
