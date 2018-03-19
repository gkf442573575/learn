import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Home from '../components/home';
import About from '../components/about';
import Inbox from '../components/inbox';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/inbox">inbox</Link>
            </li>
          </ul>

          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox" component={Inbox} />
        </div>
      </Router>
    );
  }
}

export default App;
