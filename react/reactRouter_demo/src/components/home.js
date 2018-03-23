import React,{Component} from 'react';


class Home extends Component {
    render(){
        console.log(this.props.location);
        
       return (
            <div className='home'>
                <h1>Home</h1>
            </div>
       );
    }
}
export default Home;