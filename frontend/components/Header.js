import {h, Component} from 'preact';
import { connect } from 'unistore/preact';

import config from '../config';

class Header extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">{config.general.siteName}</span>
                    <div className="mdl-layout-spacer"/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="waterfall-exp">
                            <i className="material-icons">search</i>
                        </label>
                        <div className="mdl-textfield__expandable-holder">
                            <input className="mdl-textfield__input" type="text" name="sample" id="waterfall-exp"/>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

/**
 * Connect the store to the component
 */
export default connect('router')(Header);
