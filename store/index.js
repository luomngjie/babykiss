import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		number:1,
		system:{},
		addbaby:[],
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
		addbaby(state,data){ //添加标签
			if(state.addbaby.length>=2){
				return
			}else{
				state.addbaby.push(data)
				uni.setStorageSync("tags",state.addbaby)
			}
		},
		removeBaby(state,data){//移除标签
			state.addbaby.splice(state.addbaby.findIndex(e => e.tag === data.tag), 1)
			uni.setStorageSync("tags",state.addbaby)
			
		},
		babyItem(state,data){
			state.babyInformat=data
			uni.setStorageSync("babyItem",state.babyInformat)
		}
	}
})

export default store