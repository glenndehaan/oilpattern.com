import React, {Component} from 'react';
import {connect} from 'unistore/react';
import Head from 'next/head';

import config from '../config';
import {pageIntro} from '../utils/transitions';

import Card from '../components/Card';
import VirtualList from '../components/VirtualList';

class Home extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

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
     * Renders one pattern card
     *
     * @param pattern
     * @param key
     * @return {*}
     */
    renderRow(pattern, key) {
        return (
            <Card buttons={["View", "Download"]} topIcon="share" title={pattern.title} slug={pattern.id} provider={pattern.provider} key={key}>
                {pattern.description}
            </Card>
        );
    }

    /**
     * React render function
     *
     * @returns {*}
     */
    render() {
        let patterns = [];
        if(this.props.search === '') {
            patterns = config.patterns;
        } else {
            patterns = config.patterns.filter((item) => {
                return item.title.toLowerCase().includes(this.props.search.toLowerCase());
            });
        }

        return (
            <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                <Head>
                    <title>Home | {config.general.siteName}</title>
                </Head>
                <div className="page-content">
                    <VirtualList className="list" data={patterns} rowHeight={this.props.clientWidth < 480 ? 523 : 293} renderRow={this.renderRow} overscanCount={10}/>
                </div>
            </main>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('search,clientWidth')(Home);
