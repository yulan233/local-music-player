import Vue from 'vue'
import App from './App.vue'
import router from "@/components/router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.js'
import APlayer from '@moefe/vue-aplayer';


Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(electron)
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png', // set the default cover
  productionTip: false, // disable console output
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
