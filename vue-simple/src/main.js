// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './lib/router';
import store from './lib/store'
import Promise from 'promise-polyfill';


import VueLazyload from 'vue-lazyload';

import './main.scss';


Vue.config.productionTip = false;


/**
 * TODO:正式注释掉
 */

// import VConsole from 'vconsole';
// let vConsole = new VConsole();

Vue.use(VueLazyload);

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')