import Vue from 'vue'
import App from './App.vue'
import router from "@/components/router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import * as electron from "electron";
import './assets/icon/iconfont.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(electron)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
