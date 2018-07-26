import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./router/router";
import registerServiceWorker from "./registerServiceWorker";

import "./styles/reset.less";
import "./styles/common.less";

ReactDOM.render( < AppRouter / > , document.getElementById("root"));
registerServiceWorker();