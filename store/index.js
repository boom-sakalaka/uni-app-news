// Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		userinfo: uni.getStorageSync("USERINFO")  || {},
		historyLists: uni.getStorageSync("__history")  || []
	},
	mutations:{
		SET_USER_INFO (state,userinfo) {
			state.userinfo = userinfo
		},
		SET_HISTORYLISTS(state,history){
			state.historyLists = history
		},
		CLEAR_HISTORY(state,history){
			state.historyLists = []
		}
	},
	actions:{
		set_userinfo({commit,state},userinfo){
			commit('SET_USER_INFO',userinfo)
			uni.setStorageSync('USERINFO',userinfo)
		},
		set_history({commit,state},history){
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('__history',list)
			commit('SET_HISTORYLISTS',list)
		},
		clear_history({commit}){
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store
