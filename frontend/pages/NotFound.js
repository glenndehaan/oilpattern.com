import {h, Component} from 'preact';

import config from '../config';
import {pageIntro} from '../utils/transitions';

export default class NotFound extends Component {
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
        document.title = `Not Found | ${config.general.siteName}`;

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
            <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
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
