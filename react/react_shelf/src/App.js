import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./router/router";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/reset.less";
import "./styles/common.less";

import Order from './mobx/order';

let order = new Order()

ReactDOM.render( < AppRouter order = {
            order
        }
        / > , document.getElementById("root"));
        registerServiceWorker();