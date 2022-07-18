import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";

import NavPage from "./components/Nav/NavPage";
import CarouselPage from "./components/Carousel/CarouselPage";

Vue.config.productionTip = false
Vue.component(NavPage.name,NavPage)
Vue.component(CarouselPage.name,CarouselPage)

import store from "./store";
import './mock/mock'
import 'swiper/css/swiper.css'
new Vue({
  render: h => h(App),
  router:router,
  store,
}).$mount('#app')
