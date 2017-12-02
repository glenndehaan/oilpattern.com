import React from 'react';
import {Route} from 'react-router-dom';
import {TransitionSwitch} from 'react-router-v4-transition';

import {Header} from "../general/partials/Header";
import ActionButton from "../general/partials/ActionButton";

import Index from "../index/Index";
import NotFound from "../general/NotFound";

/**
 * The router function returns the Router component with our defined routes and parameters
 * @see https://github.com/ReactTraining/react-router
 * @return {XML}
 */
export default () => {
    return (
        <div>
            <Header />
            <ActionButton/>
            <div className="container">
                <TransitionSwitch parallel={false}>
                    <Route exact path="/" component={Index}/>
                    <Route path="notfound" component={NotFound}/>
                    <Route path="*" component={NotFound}/>
                </TransitionSwitch>
            </div>
        </div>
    )
};
