import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

var devInnerHeight = 891.0 // 开发时的InnerHeight
// var devDevicePixelRatio = 1.21 // 开发时的devicepixelratio
var devDevicePixelRatio = 1.48 // 测试
// var devDevicePixelRatio = 1.6 // 测试
var devScaleFactor = 1.25 // 开发时的ScaleFactor
var scaleFactor = require('electron').screen.getPrimaryDisplay().scaleFactor
var zoomFactor = window.innerHeight / devInnerHeight * window.devicePixelRatio / devDevicePixelRatio * devScaleFactor / scaleFactor
require('electron').webFrame.setZoomFactor(zoomFactor)
require('electron').webFrame.setVisualZoomLevelLimits(1, 1)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
