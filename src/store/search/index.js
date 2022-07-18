import { getSearchData } from "@/api";
export default {
  namespaced: true,
  actions: {
    async getSearchData(content, value = {}) {
      let SearchData = await getSearchData(value)
      if (SearchData.code === 200) {
        content.commit('GETSEARCHDATA', SearchData.data)
      }
    }
  },
  mutations: {
    GETSEARCHDATA(state, value) {
      state.SearchData = value
    }
  },
  state: {
    SearchData: {}
  },
  getters: {
    goodsList(state) {
      return state.SearchData.goodsList || []
    },
    attrsList(state) {
      return state.SearchData.attrsList || []
    },
    trademarkList(state) {
      return state.SearchData.trademarkList || []
    },
  }
};