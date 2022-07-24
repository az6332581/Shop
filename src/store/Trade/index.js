import { findUserAddressList, getTrade } from "@/api";
export default {
  namespaced: true,
  actions: {
    async findUserAddressList(content) {
      let result = await findUserAddressList()
      if (result.code == 200) {
        content.commit('FINDUSERADDRESSLIST', result.data)
      }
    },
    async getTrade(content) {
      let result = await getTrade()
      if (result.code == 200) {
        content.commit('GETTRADE', result.data)
      }
    }
  },
  mutations: {
    FINDUSERADDRESSLIST(state, value) {
      state.AddressList = value
    },
    GETTRADE(state, value) {
      state.tradeList = value
    },
  },
  state: {
    AddressList: {},
    tradeList: []
  },
  getters: {
  }
};