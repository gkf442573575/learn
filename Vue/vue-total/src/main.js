import Vue from 'vue';
import 'es6-promise';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
