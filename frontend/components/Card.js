import React, {Component} from 'react';
import {connect} from 'unistore/react';
import Link from 'next/link';

import {actions} from "../modules/store";
import stringUtils from '../utils/strings';

class Card extends Component {
    /**
     * Share an oilpattern
     */
    share() {
        if(typeof window.navigator.share !== "undefined") {
            navigator.share({
                title: `Oil Pattern ${this.props.slug}`,
                text: 'Checkout this oil pattern',
                url: `https://oilpattern.com/pattern/${this.props.slug}`
            });
        } else {
            stringUtils.copyStringToClipboard(`https://oilpattern.com/pattern/${this.props.slug}`);
            this.props.updateSnackbar({
                active: true,
                children: "Link copied to clipboard"
            });

            setTimeout(() => {
                this.props.updateSnackbar({
                    active: false,
                    children: null
                });
            }, 2500);
        }
    }

    /**
     * Preact render function
     *
     * @returns {*}
     */
    render() {
        return (
            <section className="mdl-grid mdl-grid--no-spacing mdl-shadow--2dp row">
                <header className="mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone" style={{background: `url(/images/patterns/${this.props.provider}/small/${this.props.slug}_1.jpg) center / cover`}}/>
                <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <div className="mdl-card__supporting-text">
                        <h4>{this.props.title}</h4>
                        {stringUtils.truncate(stringUtils.stripHtml(this.props.children))}
                    </div>
                    {this.props.buttons &&
                        <div className="mdl-card__actions mdl-card--border">
                            {this.props.buttons.map((button, key) => {
                                if(button === 'View') {
                                    return (
                                        <Link key={key} href={`/pattern/[id]`} as={`/pattern/${this.props.slug}`}>
                                            <a className="mdl-button mdl-button--colored">
                                                {button}
                                            </a>
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <a key={key} href={this.props.online ? `/docs/patterns/${this.props.provider}/${this.props.slug}.pdf` : undefined} download={`${this.props.slug}.pdf`} disabled={!this.props.online} className="mdl-button mdl-button--colored">
                                            {button}
                                        </a>
                                    )
                                }
                            })}
                        </div>
                    }
                    {this.props.topIcon &&
                        <div className="mdl-card__menu">
                            <button className="mdl-button mdl-button--icon" onClick={() => this.share()}>
                                <i className="material-icons">{this.props.topIcon}</i>
                            </button>
                        </div>
                    }
                </div>
            </section>
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('online', actions)(Card);
