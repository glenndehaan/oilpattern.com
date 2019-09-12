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
        const items = [];

        for(let item = 0; item < 6; item ++) {
            items.push(
                <div className="mdl-cell mdl-cell--4-col">
                    <Card buttons={["View", "Download"]} topIcon="share" title="Welcome">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                    </Card>
                </div>
            )
        }

        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                    <div className="mdl-grid">
                        {items}
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
