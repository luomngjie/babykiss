import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		number:1,
		system:{},
		baby:[],
		babyInformat:{}//修改宝宝信息
	},
	getters: {
	},
	mutations: {
		/**
		 * @param {Object} state
		 * @param {Object} data
		 * 获取全局app页面宽高以及系统信息
		 */
		getSystem(state,data){
			state.system=data
		},
		baby(state,data){
			state.baby.push(data)
			uni.setStorageSync("tags",state.baby)
		},
		babyItem(state,data){
			state.babyInformat=data
			uni.setStorageSync("babyItem",state.babyInformat)
		}
	}
})

export default store