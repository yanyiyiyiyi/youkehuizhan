// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store/index.js'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import common from "./assets/js/public"
import api from "./assets/js/apiconfig.js"
import "./assets/css/flexPublic.css"
import './assets/style/theme/index.css';

Vue.prototype.common = common;
Vue.prototype.moment = moment;
Vue.prototype.api = api;
Vue.prototype.$axios = axios;

Vue.use(ElementUi)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store, //注册后，子组件中可是使用this.$store访问
  components: { App },
  template: '<App/>'
})
