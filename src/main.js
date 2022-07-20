import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";

import NavPage from "./components/Nav/NavPage";
import CarouselPage from "./components/Carousel/CarouselPage";
import Pagination from "./components/Pagination/Pagination";

Vue.config.productionTip = false
Vue.component(NavPage.name, NavPage)
Vue.component(CarouselPage.name, CarouselPage)
Vue.component(Pagination.name, Pagination)

import store from "./store";
import './mock/mock'
import 'swiper/css/swiper.css'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router: router,
  store,
}).$mount('#app')
