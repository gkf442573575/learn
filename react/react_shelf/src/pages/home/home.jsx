import React, { Component } from "react";

import { NavBar } from "antd-mobile";

import "./home.less";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goback = a => {};
    render() {
        return (
            <div id="index">
                <NavBar mode="light">
                    首页
                </NavBar>
            </div>
        );
    }
}

export default Home;
