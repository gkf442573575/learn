import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';

import registerServiceWorker from './lib/registerServiceWorker';
import App from './components/app';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
