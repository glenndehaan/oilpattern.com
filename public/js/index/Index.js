import React, {Component} from 'react';
import config from '../main/config';
import apiConnector from '../general/utils/api';
import {mainIntro, pageIntro, pageOutro} from '../general/animations/pageTransitions';

/**
 * Presentational part of the component
 * @constructor
 */
export default class Index extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            patterns: [
                {
                    name: "test"
                },
                {
                    name: "test1"
                },
                {
                    name: "test2"
                }
            ]
        };

        this.domElements = {
            mainContainer: null
        };
    }

    /**
     * Initial load
     * @param callback
     */
    componentWillAppear(callback) {
        //do something when the component will appear
        mainIntro(callback, this.domElements);
    }

    /**
     * On load
     * @param callback
     */
    componentWillEnter(callback) {
        //do something when the component will appear
        pageIntro(callback, this.domElements);
    }

    /**
     * On leave
     * @param callback
     */
    componentWillLeave(callback) {
        //do something when the component will appear
        pageOutro(callback, this.domElements);
    }

    /**
     * On mount complete
     */
    componentDidMount() {
        document.title = `Home | ${config.siteName}`;
        site.events.emit('historyChange', '/');

        this.getPatterns();
    }

    /**
     * Function to get the patterns from the API
     */
    getPatterns() {
        new apiConnector("/api/pattern", (data) => {
            this.setState({
                patterns: data.patterns
            });

            console.log('data', data);
        });
    }

    /**
     * React's Render function, should return a single child element
     * @see https://facebook.github.io/react/docs/react-component.html#render
     * @return {XML}
     */
    render() {
        return (
            <main style={{opacity: 0}} ref={c => this.domElements.mainContainer = c}>
                Hey a webpage!
                <div className="flex-container">
                    {this.state.patterns.map((item, key) => (
                        <div className="flex-item card blue-grey darken-1" key={key}>
                            <div className="card-content white-text">
                                <span className="card-title">{item.name}</span>
                                <p>Some content here</p>
                            </div>
                            <div className="card-action">
                                <a href="#">Link</a>
                                <a href="#">Link</a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        );
    }
}
