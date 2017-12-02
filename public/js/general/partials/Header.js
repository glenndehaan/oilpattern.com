import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/**
 * Presentational part of the component
 * @constructor
 */
export class Header extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.domElements = {
            menuLinks: []
        };

        this.state = {
            homeLink: false,
            projectsLink: false,
            programmingLink: false,
            aboutLink: false
        };

        // site.events.on('historyChange', e => this.updateActiveLink(e) );
    }

    updateActiveLink(path){
        for(let item = 0; item < this.domElements.menuLinks.length; item++){
            if(this.domElements.menuLinks[item].link === path){
                this.setState({[this.domElements.menuLinks[item].name]: true});
            }else{
                this.setState({[this.domElements.menuLinks[item].name]: false});
            }
        }
    }

    componentDidMount(){
        // this.updateActiveLink(window.location.pathname);
    }

    /**
     * React's Render function, should return a single child element
     * @see https://facebook.github.io/react/docs/react-component.html#render
     * @return {XML}
     */
    render() {
        return (
            <header className="header">
                <nav>
                    <div className="nav-wrapper orange darken-1">
                        <Link to="/" className="brand-logo left">Oil Pattern</Link>
                    </div>
                </nav>
            </header>
        )
    }
}
