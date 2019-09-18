import {h, Component} from 'preact';
import {connect} from "unistore/preact";

import {actions} from "../modules/store";
import stringUtils from '../utils/strings';
import cache from '../utils/cache';
import Link from "./Link";

class Card extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.state = {
            image: {
                blob: null,
                originalSource: null,
                source: null,
                extension: null
            }
        };

        this.observer = null;
        this.card = null;
    }

    /**
     * Runs then component mounts
     */
    componentDidMount() {
        this.observer = new IntersectionObserver((entries) => this.intersectionCallback(entries));
        this.observer.observe(this.card);
    }

    /**
     * Checks for intersection events
     *
     * @param entries
     */
    intersectionCallback(entries) {
        entries.forEach((entry) => {
            const visiblePct = entry.intersectionRatio;

            if(visiblePct > 0) {
                cache.get(`/images/patterns/small/${this.props.slug}_1.jpg`, (image) => {
                    this.setState({
                        image
                    });
                });
            } else {
                this.setState({
                    image: {
                        blob: null,
                        originalSource: null,
                        source: null,
                        extension: null
                    }
                });
            }
        });
    }

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
            <div className="card-wide mdl-card mdl-shadow--2dp" ref={(c) => this.card = c}>
                <div className="mdl-card__title" style={{background: `${this.state.image.source !== null ? `url(${this.state.image.source})` : 'none'} center / cover`}}>
                    <h2 className="mdl-card__title-text">
                        {this.props.title}
                    </h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {stringUtils.truncate(stringUtils.stripHtml(this.props.children))}
                </div>
                {this.props.buttons &&
                    <div className="mdl-card__actions mdl-card--border">
                        {this.props.buttons.map((button, key) => {
                            if(button === 'View') {
                                return (
                                    <Link key={key} href={`/pattern/${this.props.slug}`} className="mdl-button mdl-button--colored">
                                        {button}
                                    </Link>
                                )
                            } else {
                                return (
                                    <a key={key} href={this.props.online && `/docs/patterns/${this.props.slug}.pdf`} download={`${this.props.slug}.pdf`} disabled={!this.props.online} className="mdl-button mdl-button--colored">
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
        );
    }
}

/**
 * Connect the store to the component
 */
export default connect('online', actions)(Card);
