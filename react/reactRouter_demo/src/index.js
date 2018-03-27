import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './lib/registerServiceWorker';
// import ParamsExample from './app/paramsExample'
import {BrowserRouter} from 'react-router-dom'

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition)
}

ReactDOM.render(
    <BrowserRouter basename='/app' 
    getUserConfirmation={getConfirmation}
    forceRefresh={true}
    >
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
