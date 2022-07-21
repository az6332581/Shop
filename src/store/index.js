import Vue from 'vue'
import Vuex from 'vuex'

import homeInfo from "./home";
import searchInfo from "./search";
import detailInfo from "./detail";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homeInfo,
    searchInfo,
    detailInfo
  }
})