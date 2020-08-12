import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		number:1,
		system:{},
		addinfo:uni.getStorageSync("addinfo"),//新增大事记缓存备注信息和图片
		addbaby:[],//自定义标签
		tag:null,//第一次标签
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
				state.addbaby = uni.getStorageSync("tags")
				
			}
		},
		firstAdd(state,data){//添加第一次标签
			uni.setStorageSync("tag",data)
			state.tag = uni.getStorageSync("tag")
		},
		removeBaby(state,data){//移除标签
			uni.setStorageSync("tags",data)
			state.addbaby = data
			
		},
		babyItem(state,data){
			state.babyInformat=data
			uni.setStorageSync("babyItem",state.babyInformat)
		},
		addinfo(state,data){
			uni.setStorageSync("addinfo",data)
		}
	}
})

export default store