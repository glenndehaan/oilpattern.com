import {h, Component} from 'preact';

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
                <button className="mdl-snackbar__action" type="button" name="Snackbar action button"/>
            </div>
        );
    }
}
