import '../utils/polyfills';

import React from 'react';
import App from 'next/app';
import {Provider} from 'unistore/react';

import store from '../modules/store';
import {validateServiceWorkerInstance} from '../utils/sw';
import Header from '../components/Header';

import '../scss/style.scss';

export default class MyApp extends App {
    /**
     * @return Object
     */
    static async getInitialProps() {
        return {};
    }

    /**
     * Constructor
     */
    constructor() {
        super();

        /**
         * Initialize the app
         */
        validateServiceWorkerInstance("/kill-switch.txt");

        /**
         * Check if search query has been send
         * @todo Needs fix for server side rendering
         */
        if(typeof window !== "undefined") {
            if(window.location.search.includes("?search=")) {
                const search = window.location.search.replace('?search=', '');
                store.setState({
                    search
                });
            }
        }

        /**
         * Check for resize events
         */
        if(typeof window !== "undefined") {
            window.addEventListener("resize", () => {
                store.setState({
                    clientWidth: document.body.clientWidth
                });
            });
        }
    }

    /**
     * React render function
     *
     * @returns {*}
     */
    render() {
        const {Component, pageProps} = this.props;
        return (
            <Provider store={store}>
                <div className="mdl-layout mdl-layout--fixed-header">
                    <Header/>
                    <Component {...pageProps} />
                </div>
            </Provider>
        );
    }
}
