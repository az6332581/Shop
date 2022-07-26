import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";

import NavPage from "./components/Nav/NavPage";
import CarouselPage from "./components/Carousel/CarouselPage";
import Pagination from "./components/Pagination/Pagination";

Vue.config.productionTip = false

Vue.component(NavPage.name, NavPage)
Vue.component(CarouselPage.name, CarouselPage)
Vue.component(Pagination.name, Pagination)

import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import './mock/mock'
import 'swiper/css/swiper.css'
import * as API from '@/api'

import '@/plugins/lazyLoad'
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
