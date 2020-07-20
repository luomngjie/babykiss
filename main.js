import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './api/server.js'

import validate from '@/common/validate.js'//表单验证
Vue.prototype.$validate = validate
/*
**单独使用时候
	if (!this.$validate.isPhone(this.userInfo.tel)) {
	  uni.showToast({
		icon: 'none',
		title: '请输入正确的手机号'
	  })
	}

	验证整个表单
	let loginRules = [
	  {name: 'tel', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
	  {name: 'pwd', type: 'required', errmsg: '请输入密码'},
	  {name: 'pwd', type: 'pwd', errmsg: '密码须是6～16位字符'},
	  {name: 'pwd2', type: 'eq', eqName: 'pwd', required: true, errmsg: '两次输入密码不一致'},
	  {name: 'telCode', type: 'required', errmsg: '请输入验证码'},
	  {name: 'telCode', type: 'lengthRange', min: 6, max: 6, errmsg: '请正确输入验证码'}
	]
	let valLoginRes = this.$validate.validate(this.userInfo, loginRules)
	if (!valLoginRes.isOk) {
	  uni.showToast({
		icon: 'none',
		title: valLoginRes.errmsg
	  })
	  return false
	}
*/

Vue.config.productionTip = false

Vue.prototype.http = http

// navbar
import custom from '@/components/custom.vue'
Vue.component('custom',custom)

import uniPopup from '@/components/uni-popup/uni-popup.vue'
Vue.component('uni-popup',uniPopup)

import modal from '@/components/modal/modal.vue'
Vue.component('cu-modal',modal)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
