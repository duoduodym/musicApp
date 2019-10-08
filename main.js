import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
Vue.config.productionTip = false
Vue.prototype.$http = request
import store from './store'  
import '@/common/style/common.less'
Vue.prototype.$store = store  
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
export default app
