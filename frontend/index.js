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

document.querySelector('#app').innerHTML = "";
render(<Provider store={store}><Router/></Provider>, document.querySelector('#app'));
// require('preact/debug');
