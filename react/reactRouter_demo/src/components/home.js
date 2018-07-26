import React,{Component} from 'react';


class Home extends Component {


    goAbout = ()=>{
        this.props.history.push({
            pathname:'/about',
        })
    }


    render(){
       
       return (
            <div className='home'>
                <h1>Home</h1>
                <button onClick={this.goAbout}>去其他页</button>
            </div>
       );
    }
}
export default Home;