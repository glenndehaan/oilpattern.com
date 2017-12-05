import React, {Component} from 'react';

/**
 * Presentational part of the component
 * @constructor
 */
export default class ActionButton extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.domElements = {};
    }

    /**
     * React's Render function, should return a single child element
     * @see https://facebook.github.io/react/docs/react-component.html#render
     * @return {XML}
     */
    render() {
        return (
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">search</i>
                </a>
            </div>
        )
    }
}
