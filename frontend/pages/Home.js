import {h, Component} from 'preact';
import {connect} from "unistore/preact";

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
            <main className="mdl-layout__content" ref={(c) => this.domElements.mainContainer = c}>
                <div className="page-content">
                    <div className="mdl-grid">
                        {config.patterns.map((pattern, key) => {
                            if(this.props.search === '') {
                                return (
                                    <div key={key} className="mdl-cell mdl-cell--4-col">
                                        <Card buttons={["View", "Download"]} topIcon="share" title={pattern.title} slug={pattern.id}>
                                            {pattern.description}
                                        </Card>
                                    </div>
                                )
                            } else {
                                if(pattern.title.toLowerCase().includes(this.props.search.toLowerCase())) {
                                    return (
                                        <div key={key} className="mdl-cell mdl-cell--4-col">
                                            <Card buttons={["View", "Download"]} topIcon="share" title={pattern.title} slug={pattern.id}>
                                                {pattern.description}
                                            </Card>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                </div>
            </main>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('search')(Home);
