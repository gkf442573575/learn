import React from "react";
import ReactDOM from "react-dom";
import Index from "./pages/index";

import { BrowserRouter } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";

import "./styles/reset.less";
import "./styles/common.less";


const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};



ReactDOM.render(
    <BrowserRouter
        basename="/"
        getUserConfirmation={getConfirmation}
        forceRefresh={true}
    >
        <Index />
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
