import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './api/server.js'

Vue.config.productionTip = false

Vue.prototype.http = http //带域名

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
