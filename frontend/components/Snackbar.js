import React, {Component} from 'react';

export default class Snackbar extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className={`mdl-snackbar ${this.props.visible && 'mdl-snackbar--active'}`}>
                <div className="mdl-snackbar__text" dangerouslySetInnerHTML={{__html: this.props.children}}/>
            </div>
        );
    }
}
