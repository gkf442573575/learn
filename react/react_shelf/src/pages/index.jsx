import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import { NavBar, TabBar } from "antd-mobile";
import config from "../units/config";

import Home from "./home";
import Cart from "./cart";
import User from "./user";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const TabBarList = [
            {
                path: "/home",
                text: "home",
                title: "首页",
                icon: "hicon-home",
                component: Home
            },
            {
                path: "/cart",
                text: "cart",
                title: "购物车",
                icon: "hicon-cart",
                component: Cart
            },
            {
                path: "/user",
                text: "user",
                title: "我的",
                icon: "hicon-user",
                component: User
            }
        ];
        let path = this.props.location.pathname;
        return (
            <div id="router">
                <NavBar mode="light">
                    {TabBarList.find(v => v.path === path).title}
                </NavBar>
                <div className="barpage">
                    <Switch>
                        {TabBarList.map(v => (
                            <Route
                                key={v.path}
                                path={v.path}
                                component={v.component}
                            />
                        ))}
                    </Switch>
                </div>
                <TabBar
                    tintColor={config.primary}
                    unselectedTintColor="#C0C0C0"
                >
                    {TabBarList.map(v => (
                        <TabBar.Item
                            title={v.title}
                            key={v.text}
                            icon={<div className={`tabbar ${v.icon}`} />}
                            selectedIcon={
                                <div className={`tabbar ${v.icon}`} />
                            }
                            selected={v.path === path}
                            onPress={() => {
                                this.props.history.push(v.path);
                            }}
                        />
                    ))}
                </TabBar>
            </div>
        );
    }
}

export default Index;
