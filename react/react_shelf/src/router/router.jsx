import React, { Component } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import Order from "../pages/order";

import Login from "../pages/login";

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter basename="/" getUserConfirmation={getConfirmation}>
                <div id="app">
                    <Switch>
                        <Route exact path="/" Component={Login} />
                        <Route path="/order" component={Order} />
                        <Route component={Index} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default AppRouter;
