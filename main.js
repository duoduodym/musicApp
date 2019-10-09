import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
import store from './store'  
import '@/common/style/common.less'
import loading from '@/components/loading.vue'
Vue.prototype.$store = store  
Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.component('v-loading',loading)
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
export default app
