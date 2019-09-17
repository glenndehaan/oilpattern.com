import {h, Component} from 'preact';

import stringUtils from '../utils/strings';
import cache from '../utils/cache';
import Link from "./Link";

export default class Card extends Component {
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
                                    <Link key={key} href={`/pattern/${this.props.slug}`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        {button}
                                    </Link>
                                )
                            } else {
                                return (
                                    <a key={key} href={`/docs/patterns/${this.props.slug}.pdf`} download={`${this.props.slug}.pdf`} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        {button}
                                    </a>
                                )
                            }
                        })}
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
