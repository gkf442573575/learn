import React, { Component } from "react";

import { NavBar, Icon } from "antd-mobile";

import "./index.less";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goback = a => {
      
  };
  render() {
    return (
      <div id="index">
        <NavBar mode="light" onLeftClick={this.goback.bind(this, 1)}>
          首页
        </NavBar>
      </div>
    );
  }
}

export default Index;
