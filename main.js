import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './api/server.js'

import validate from '@/common/validate.js'//表单验证
Vue.prototype.$validate = validate


Vue.config.productionTip = false

Vue.prototype.http = http

// navbar
import custom from '@/components/custom.vue'
Vue.component('custom',custom)

import uniPopup from '@/components/uni-popup/uni-popup.vue'
Vue.component('uni-popup',uniPopup)

import modal from '@/components/modal/modal.vue'
Vue.component('cu-modal',modal)

import uniIcons from "@/components/uni-icons/uni-icons.vue"
Vue.component('uniIcons',uniIcons)

import uniLoadMore from './components/uni-load-more/uni-load-more.vue'
Vue.component('uniLoadMore',uniLoadMore)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
