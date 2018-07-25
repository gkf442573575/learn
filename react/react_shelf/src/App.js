import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.less';

import Index from './pages/index/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( < Index / > , document.getElementById('root'));
registerServiceWorker();