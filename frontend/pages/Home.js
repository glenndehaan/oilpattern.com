import {h, Component} from 'preact';
import { connect } from 'unistore/preact';

import config from '../config';
import {pageIntro} from '../utils/transitions';
import Card from "../components/Card";

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
        document.title = `Home | ${config.general.siteName}`;

        //Start intro when the component will appear
        pageIntro(() => {}, this.domElements);
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                    <div className="mdl-grid">
                        {config.patterns.map((pattern, key) => (
                            <div key={key} className="mdl-cell mdl-cell--4-col">
                                <Card buttons={["View", "Download"]} topIcon="share" title={pattern.title} slug="plutonium_2239">
                                    {pattern.description}
                                </Card>
                            </div>
                        ))}
                        <div className="mdl-cell mdl-cell--4-col">
                            <Card buttons={["View", "Download"]} topIcon="share" title="Plutonium 2239" slug="plutonium_2239">
                                This 39 foot pattern to your ego is a lot like the element Plutonium for the world ‐ “it can create or destroy”.
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('programming')(Home);
