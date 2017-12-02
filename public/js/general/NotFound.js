import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../main/config';
import {mainIntro, pageIntro, pageOutro} from './animations/pageTransitions';

/**
 * Presentational part of the component
 * @constructor
 */
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
    componentDidMount(){
        document.title = `Not Found | ${config.siteName}`;
        site.events.emit('historyChange', '');
    }

    /**
     * React's Render function, should return a single child element
     * @see https://facebook.github.io/react/docs/react-component.html#render
     * @return {XML}
     */
    render() {
        return (
            <main style={{opacity: 0}} className="page not-found" ref={(c) => this.domElements.mainContainer = c}>
                <h2>404 Page not found!</h2>
                <h5>Click the logo to return to home or <Link to="/">click here</Link></h5>
            </main>
        )
    }
}
