import {h, Component} from 'preact';
import {connect} from "unistore/preact";
import VirtualList from 'preact-virtual-list';

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
     * Renders one pattern card
     *
     * @param pattern
     * @return {*}
     */
    renderRow(pattern) {
        return (
            <Card buttons={["View", "Download"]} topIcon="share" title={pattern.title} slug={pattern.id}>
                {pattern.description}
            </Card>
        );
    }

    /**
     * Preact render function
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
                <div className="page-content">
                    <VirtualList class="list" data={patterns} rowHeight={this.props.clientWidth < 480 ? 523 : 293} renderRow={this.renderRow} overscanCount={10}/>
                </div>
            </main>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('search,clientWidth')(Home);
