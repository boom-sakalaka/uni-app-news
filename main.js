import Vue from 'vue'
import App from './App'
import api from './common/api'
import store from './store/index.js'
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
