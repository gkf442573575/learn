import React, { Component } from 'react';
import Home from '../pages/home/home';
import Cart from '../pages/cart/cart';
import My from '../pages/my/my';
import './App.scss';

class App extends Component {
  state = {
    selectContent: 'home'
  };
  barlist = [{
    icon: 'icon-home',
    text: '主页',
    select: 'home'
  }, {
    icon: 'icon-cart',
    text: '购物车',
    select: 'cart'
  }, {
    icon: 'icon-user',
    text: '我的',
    select: 'my'
  }];
  selectBar = select => {
    this.setState({
      selectContent: select
    })
  }
  render() {
    let { selectContent } = this.state;
    let content = <Home />
    switch (selectContent) {
      case 'home':
        content = <Home />
        break;
      case 'cart':
        content = <Cart />
        break;
      case 'my':
        content = <My />
        break;
      default:
        content = <Home />
        break;
    }
    return (
      <div className='App'>
        <div className='app-content'>
          {content}
        </div>
        <div className='footbar'>
          {this.barlist.map(item =>
            <div key={item.select}
              className={`bar-btn ${selectContent === item.select ? 'select' : ''}`}
              onClick={this.selectBar.bind(this, item.select)}
            >
              <div className={`bar-icon ${item.icon}`}></div>
              <div className='bar-txt'>{item.text}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
