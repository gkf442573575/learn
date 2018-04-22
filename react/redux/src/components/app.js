import React, {Component} from 'react';

import Footer from './Footer';
import AddTodo from '../store/containers/AddTodo';
import VisibleTodoList from '../store/containers/VisibleTodoList';

class App extends Component {
    render(){
        return (
            <div>
                <AddTodo></AddTodo>
                <VisibleTodoList></VisibleTodoList>
                <Footer></Footer>
            </div>
        )
    }
};

export default App;