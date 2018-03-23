import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './lib/registerServiceWorker';
// import ParamsExample from './app/paramsExample'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
registerServiceWorker();
