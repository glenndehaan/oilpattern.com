import React, {Component} from 'react';
import Head from 'next/head';

import config from '../config';
import {pageIntro} from '../utils/transitions';

export default class MyError extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.domElements = {
            mainContainer: null
        };
    }

    /**
     * Runs then component mounts
     */
    componentDidMount(){
        //Start intro when the component will appear
        pageIntro(() => {}, this.domElements);
    }

    /**
     * React render function
     *
     * @returns {*}
     */
    render() {
        return (
            <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                <Head>
                    <title>Not Found | {config.general.siteName}</title>
                    <meta name="description" content="The bowling oilpattern catalog / Provides all oilpatterns from mayor vendors in a small website optimized for mobile"/>
                    <meta property="og:title" content={`Not Found | ${config.general.siteName}`}/>
                    <meta property="og:description" content="The bowling oilpattern catalog / Provides all oilpatterns from mayor vendors in a small website optimized for mobile"/>
                </Head>
                <div className="page-content">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--10-col">
                            <h2>404 Page not found!</h2>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
