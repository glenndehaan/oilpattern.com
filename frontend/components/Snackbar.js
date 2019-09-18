import {h, Component} from 'preact';

export default class Snackbar extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.container = null;
    }

    /**
     * Runs then component mounts
     */
    componentDidMount() {
        this.container.classList.add('mdl-snackbar--active');

        setTimeout(() => {
            this.container.classList.remove('mdl-snackbar--active');
        }, 2000);
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="mdl-snackbar" ref={(c) => this.container = c}>
                <div className="mdl-snackbar__text">Test</div>
                <button className="mdl-snackbar__action" type="button"/>
            </div>
        );
    }
}
