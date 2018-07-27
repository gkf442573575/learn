import React, {Component} from 'react';

import { NavBar } from "antd-mobile";


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div id='Order'>
                <NavBar mode="light">
                    提交订单
                </NavBar>
            </div>
        );
    }
}
  
export default Order;