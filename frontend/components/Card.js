import {h, Component} from 'preact';

import Link from "./Link";

export default class Card extends Component {
    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">
                        {this.props.title}
                    </h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {this.props.children}
                </div>
                {this.props.buttons &&
                    <div className="mdl-card__actions mdl-card--border">
                        {this.props.buttons.map((button, key) => (
                            <Link key={key} href="/pattern" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                {button}
                            </Link>
                        ))}
                    </div>
                }
                {this.props.topIcon &&
                    <div className="mdl-card__menu">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">{this.props.topIcon}</i>
                        </button>
                    </div>
                }
            </div>
        );
    }
}
