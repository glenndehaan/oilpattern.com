import {h, Component} from 'preact';
import { connect } from 'unistore/preact';

import {actions} from "../modules/store";
import config from '../config';
import Link from "./Link";

class Header extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.searchBar = null;
    }

    /**
     * Updates the store with the search value
     */
    search() {
        this.props.updateSearch(this.searchBar.value);
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title"><Link href="/">{config.general.siteName}</Link></span>
                    <div className="mdl-layout-spacer"/>
                    {this.props.router.url === '/' &&
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right is-focused">
                            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="waterfall-exp">
                                <i className="material-icons">search</i>
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
export default connect('router,search', actions)(Header);
