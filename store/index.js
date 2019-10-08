import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		scrollToView: '',
		showLoading: false,
		playerStatus:false,
		lrcTop:0,
		currentTime:-1,
		currentId:''
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
		},
		changeLrcTop(state,top){
			state.lrcTop = top
		},
		changeCurrentTime(state,time){
			state.currentTime = time
		},
		changeCurrentId(state,id){
			state.currentId = id
		}
	}
})
export default store
