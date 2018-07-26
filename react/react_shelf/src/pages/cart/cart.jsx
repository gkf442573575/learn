import React, { Component } from "react";

import { Button } from "antd-mobile";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    sendorder = () => {
        let history = this.props.history;
        history.push({
            pathname: "/order"
        });
    };

    render() {
        return (
            <div id="cart">
                <Button onClick={this.sendorder}>提交订单</Button>
            </div>
        );
    }
}

export default Cart;
