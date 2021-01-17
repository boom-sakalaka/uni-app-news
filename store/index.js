// Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		historyLists: []
	},
	mutations:{
		SET_HISTORYLISTS(state,history){
			state.historyLists = history
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyLists
			list.unshift(history)
			commit('SET_HISTORYLISTS',list)
		}
	}
})

export default store
