import {h, Component} from 'preact';
import { connect } from 'unistore/preact';

import {actions} from "../modules/store";
import config from '../config';
import Link from "./Link";
import Snackbar from "./Snackbar";

class Header extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.state = {
            searchOpen: false
        };

        this.searchBar = null;
        this.container = null;
    }

    /**
     * Runs then component mounts
     */
    componentDidMount() {
        document.body.addEventListener("click", (e) => this.searchHandler(e));
        window.addEventListener('online', () => this.props.updateOnlineState(true));
        window.addEventListener('offline', () => this.props.updateOnlineState(false));
    }

    /**
     * Checks if we need to close the search bar
     *
     * @param e
     */
    searchHandler(e) {
        if(e.path) {
            if(this.searchBar) {
                if (!e.path.includes(this.container) && this.searchBar.value === '') {
                    this.setState({
                        searchOpen: false
                    });
                }
            }
        }
    }

    /**
     * Updates the store with the search value
     */
    search() {
        this.props.updateSearch(this.searchBar.value);
    }

    /**
     * Opens/closes the search bar
     *
     * @param state
     */
    searchToggle(state) {
        this.setState({
            searchOpen: state
        })
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <header className="mdl-layout__header">
                <Snackbar visible={!this.props.online}>
                    App is offline!
                </Snackbar>
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title"><Link href="/">{config.general.siteName}</Link></span>
                    <div className="mdl-layout-spacer"/>
                    {this.props.router.url === '/' &&
                        <div className={`mdl-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right ${this.state.searchOpen ? 'is-focused' : ''}`} ref={e => this.container = e}>
                            <label className="mdl-button mdl-button--icon" htmlFor="waterfall-exp">
                                <i className="material-icons" onClick={() => this.searchToggle(true)}>search</i>
                            </label>
                            <div className="mdl-textfield__expandable-holder">
                                <input className="mdl-textfield__input" type="text" name="sample" id="waterfall-exp" value={this.props.search} ref={(c) => this.searchBar = c} onKeyUp={() => this.search()}/>
                            </div>
                        </div>
                    }
                </div>
            </header>
        )
    }
}

/**
 * Connect the store to the component
 */
export default connect('router,search,online', actions)(Header);
