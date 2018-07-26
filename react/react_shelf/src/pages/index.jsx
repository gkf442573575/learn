import React, { Component } from "react";

import { TabBar } from "antd-mobile";

import config from "../units/config";

import Home from "../pages/home/home";
import Cart from "../pages/cart/cart";
import User from "../pages/user/user";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home"
        };
    }
    tabClick = name => {
        this.setState({
            selectedTab: name
        });
    };

    render() {
        return (
            <div id="router">
                <TabBar
                    tintColor={config.primary}
                    unselectedTintColor="#C0C0C0"
                >
                    <TabBar.Item
                        title="首页"
                        icon={<div className="tabbar hicon-home" />}
                        selectedIcon={<div className="tabbar hicon-home" />}
                        selected={this.state.selectedTab === "home"}
                        onPress={this.tabClick.bind(this, "home")}
                    >
                        <Home />
                    </TabBar.Item>
                    <TabBar.Item
                        title="购物车"
                        icon={<div className="tabbar hicon-cart" />}
                        selectedIcon={<div className="tabbar hicon-cart" />}
                        selected={this.state.selectedTab === "cart"}
                        onPress={this.tabClick.bind(this, "cart")}
                    >
                        <Cart />
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        icon={<div className="tabbar hicon-user" />}
                        selectedIcon={<div className="tabbar hicon-user" />}
                        selected={this.state.selectedTab === "user"}
                        onPress={this.tabClick.bind(this, "user")}
                    >
                        <User />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Index;
