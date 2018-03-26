import React,{Component} from 'react';



class About extends Component {
    render(){
        let props = this.props,
            match = props.match,
            params = match.params;       
        return (
            <div className = 'about'>
                <h1>About {params.id}</h1>
            </div>
        )
    }

}

export default About;