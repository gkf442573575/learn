import React,{Component} from 'react';



class About extends Component {
   

    goHome = ()=>{
        console.log(this.props.history);
        let history = this.props.history;
        // history.push('/inbox');

        history.replace({
            pathname:'/inbox',
            state:{
                from:'1'
            }
        })
    }

    render(){
        let props = this.props,
            match = props.match,
            params = match.params;       
        return (
            <div className = 'about'>
                <h1>About {params.id}</h1>
                <button onClick={this.goHome}>点击</button>
            </div>
        )
    }

}

export default About;