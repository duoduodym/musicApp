import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		scrollToView: '',
		showLoading: false,
		playerStatus:false  
	},
	mutations: {
		changeScroll(state, type) {
			state.scrollToView = type
		},
		changeLoading(state, type){
			state.showLoading = type
		},
		changePlayStatus(state, type){
			state.playerStatus = type
		}
	}
})
export default store
