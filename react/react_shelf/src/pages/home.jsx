import React, { Component } from "react";

import axios from "../units/axios";

import { Carousel, Toast } from "antd-mobile";
// import "";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannelist: []
        };
    }

    getIndexGoods = () => {
        axios
            .get("app/reserveorder/listindex.do")
            .then(res => res.data)
            .then(res => {
                console.log("res", res);
                if (res.success) {
                } else {
                    Toast.fail(res.msg, 1, () => {}, true);
                }
            })
            .catch(err => {});
    };

    componentWillMount() {
        this.getIndexGoods();
    }

    render() {
        return <div id="home" />;
    }
}

export default Home;
