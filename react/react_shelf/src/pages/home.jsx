import React, { Component } from "react";

import { observer } from "mobx-react";

import { Toast, Button } from "antd-mobile";
// import "";
import axios from "../units/axios";

@observer
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

    orderPush = () => {
        let order = this.props.order;
        order.pushOrder(1);
    };
    render() {
        return (
            <div id="home">
                <Button onClick={this.orderPush}>增加</Button>
                <Button>减少</Button>
            </div>
        );
    }
}

export default Home;
