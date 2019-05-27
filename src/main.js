import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import store from './store/store'

Vue.config.productionTip = false

store.dispatch("init");
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
