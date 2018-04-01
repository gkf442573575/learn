import React, { Component} from 'react';
class Inbox extends Component {
    render (){
        console.log('state',this.props.location.state);
        
        return (
            <div className='indox'>
                <h1>Indox</h1>
            </div>
        )
    }
}
export default Inbox;