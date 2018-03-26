import React,{Component} from 'react';
import { BrowserRouter as Router,Switch,Route, Link } from "react-router-dom";


import Home from '../components/home';
import About from '../components/about';
import Inbox from '../components/inbox';
import Page404 from '../components/page404';
class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to='/'>HOME</Link>
                        </li>
                        <li>
                            <Link to='/about/1'>ABOUT</Link>
                        </li>
                        <li>
                            <Link to='/inbox'>INBOX</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about/:id' component={About} />
                        <Route path='/inbox' component={Inbox} />
                        <Route component = {Page404} />
                    </Switch> 
                </div>
            </Router>
        )
    }
}

export default App;