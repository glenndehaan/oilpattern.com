import React, {Component} from 'react';
import {connect} from 'unistore/react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Error from '../_error';

import config from '../../config';
import {pageIntro} from '../../utils/transitions';

class Pattern extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        const {id} = props.router.query;

        this.state = {
            content: this.searchPattern(parseInt(id), config.patterns),
            imageOffline: false
        };

        this.domElements = {
            mainContainer: null
        };
    }

    /**
     * Runs then component mounts
     */
    componentDidMount() {
        //Start intro when the component will appear
        pageIntro(() => {}, this.domElements);
    }

    /**
     * Search for pattern
     *
     * @param id
     * @param patterns
     * @return {*}
     */
    searchPattern(id, patterns) {
        for (let i = 0; i < patterns.length; i++) {
            if (patterns[i].id === id) {
                return patterns[i];
            }

            if (i === patterns.length - 1) {
                return false;
            }
        }

        return false;
    }

    /**
     * Display the fallback since the image is not available
     */
    imageOffline() {
        console.log('image offline!');
        this.setState({
            imageOffline: true
        });
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        if(this.state.content) {
            return (
                <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                    <Head>
                        <title>{this.state.content.title} | {config.general.siteName}</title>
                        <meta name="description" content={`${this.state.content.title} - ${this.state.content.category} - Distance: ${this.state.content.distance} feet / The bowling oilpattern catalog`}/>
                        <meta property="og:title" content={`${this.state.content.title} | ${config.general.siteName}`}/>
                        <meta property="og:description" content={`${this.state.content.title} - ${this.state.content.category} - Distance: ${this.state.content.distance} feet / The bowling oilpattern catalog`}/>
                    </Head>
                    <div className="page-content">
                        <Link href="/">
                            <a>
                                <button className="mdl-button mdl-button--fab fixed-button mdl-color--primary mdl-color-text--primary-contrast">
                                    <i className="material-icons">close</i>
                                </button>
                            </a>
                        </Link>
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
                                <h5>Oil Pattern Specifications</h5>
                                <table className="mdl-data-table mdl-shadow--2dp">
                                    <tbody>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Title</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.title}</td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Category</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.category}</td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Distance</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.distance}</td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Volume</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.volume} mL</td>
                                        </tr>
                                        {this.state.content.forward !== '' &&
                                            <tr>
                                                <td className="mdl-data-table__cell--non-numeric">Forward</td>
                                                <td className="mdl-data-table__cell--non-numeric">{this.state.content.forward} mL</td>
                                            </tr>
                                        }
                                        {this.state.content.reverse !== '' &&
                                            <tr>
                                                <td className="mdl-data-table__cell--non-numeric">Reverse</td>
                                                <td className="mdl-data-table__cell--non-numeric">{this.state.content.reverse} mL</td>
                                            </tr>
                                        }
                                        {this.state.content.description !== '' &&
                                            <tr>
                                                <td className="mdl-data-table__cell--non-numeric">Description</td>
                                                <td className="mdl-data-table__cell--non-numeric">
                                                    {this.state.content.description}
                                                </td>
                                            </tr>
                                        }
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">PDF</td>
                                            <td className="mdl-data-table__cell--non-numeric">
                                                <a href={this.props.online && `/docs/patterns/${this.state.content.provider}/${this.state.content.id}.pdf`} download={`${this.state.content.id}.pdf`} disabled={!this.props.online} className="mdl-button mdl-button--raised mdl-button--colored">
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Provider</td>
                                            <td className="mdl-data-table__cell--non-numeric">
                                                <img className="provider-logo" src={`/images/provider/${this.state.content.provider}.png`} alt="Provider logo" title="Oilpattern Provider Logo"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mdl-cell mdl-cell--8-col">
                                {!this.state.imageOffline &&
                                    <img alt="Pattern Image" className="pattern-image" src={`/images/patterns/${this.state.content.provider}/${this.state.content.id}_1.jpg`} title={`${this.state.content.title} oilpattern`} onError={() => this.imageOffline()}/>
                                }
                                {this.state.imageOffline &&
                                    <div className="offline-image">
                                        Image not available...
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            );
        } else {
            return (
                <Error/>
            );
        }
    }
}

/**
 * Connect the store to the component
 */
export default connect('online')(withRouter(Pattern));
