import {h, Component} from 'preact';

import config from '../config';
import {pageIntro} from '../utils/transitions';
import stringUtils from '../utils/strings';

import Link from "../components/Link";

export default class Pattern extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.state = {
            content: false
        };

        this.domElements = {
            mainContainer: null
        };
    }

    /**
     * Runs then component mounts
     */
    componentDidMount(){
        document.title = `Pattern | ${config.general.siteName}`;
        window.componentHandler.upgradeDom();

        const urlParts = this.props.url.split('/');
        this.setState({
            content: this.searchPattern(parseInt(urlParts[urlParts.length - 1]), config.patterns)
        });

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
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        if(this.state.content) {
            return (
                <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                    <div className="page-content">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
                                <Link href="/">
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                        Back
                                    </button>
                                </Link>
                                <br/>
                                <br/>
                                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
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
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Forward</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.forward} mL</td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Reverse</td>
                                            <td className="mdl-data-table__cell--non-numeric">{this.state.content.reverse} mL</td>
                                        </tr>
                                        <tr>
                                            <td className="mdl-data-table__cell--non-numeric">Description</td>
                                            <td className="mdl-data-table__cell--non-numeric">
                                                {stringUtils.stripHtml(this.state.content.description)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mdl-cell mdl-cell--8-col">
                                <img className="pattern-image" src={`/images/patterns/${this.state.content.id}_1.jpg`}/>
                            </div>
                        </div>
                    </div>
                </main>
            );
        } else {
            return (
                <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                    <div className="page-content">
                        <div className="mdl-grid">
                            <div className="mdl-cell mdl-cell--10-col">
                                <h2>404 Page not found!</h2>
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
    }
}
