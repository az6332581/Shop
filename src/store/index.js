import Vue from 'vue'
import Vuex from 'vuex'

import homeInfo from "./home";
import searchInfo from "./search";
import detailInfo from "./detail";
import cartInfo from './cart';
import userInfo from './user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homeInfo,
    searchInfo,
    detailInfo,
    cartInfo,
    userInfo
  }
})