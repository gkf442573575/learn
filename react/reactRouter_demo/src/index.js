import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './lib/registerServiceWorker';
// import { Router } from 'react-router';
// import Home from './components/home';
// import About from './components/about'
// import Inbox from './components/inbox'

// const routes = {
//     path: '/',
//     component: App,
//     indexRoute: { component: Home },
//     childRoutes: [
//       { path: 'about', component: About },
//       { path: 'inbox', component: Inbox },
//     ]
//   }

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
registerServiceWorker();
