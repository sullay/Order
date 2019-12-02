import Vue from 'vue'
import App from './App'
import store from './store'
import config from './config'
import api from './service'
Vue.prototype.$store = store
Vue.prototype.$api=api
Vue.prototype.baseUrl = config.httpConfig.baseUrl
Vue.prototype.wsUrl = config.wsConf.baseUrl
Vue.prototype.fileUrl = config.fileConfig.baseUrl
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
