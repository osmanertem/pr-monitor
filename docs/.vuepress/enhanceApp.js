import Vue from 'vue'
import Vuex from "vuex";
import store from '../../src/store/store'

Vue.config.productionTip = false

export default ({
    Vue,
}) => {
    store.dispatch("init");
    Vue.use(Vuex),
    Vue.mixin({store: store}) // Activate o vuex
}