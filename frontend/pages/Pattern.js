import {h, Component} from 'preact';
import { connect } from 'unistore/preact';

import config from '../config';
import {pageIntro} from '../utils/transitions';
import Link from "../components/Link";

class Pattern extends Component {
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
        document.title = `Pattern | ${config.general.siteName}`;

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
                        <Link href="/">Back</Link>
                        <img src="/images/patterns/plutonium_2239.jpg"/>
                    </div>
                </div>
            </main>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('programming')(Pattern);
