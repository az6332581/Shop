import { getGoodsData, sendShopCart } from "@/api"

const actions = {
  async getGoodsData(content, value) {
    let goodsData = await getGoodsData(value)
    if (goodsData.code == 200) {
      content.commit('GETGOODSDATA', goodsData.data)
    }
  },
  async sendShopCart(content, { pdid, count }) {
    let Result = await sendShopCart(pdid, count)
    if (Result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETGOODSDATA(state, value) {
    state.goodsData = value
  }
}
const state = {
  goodsData: {}
}
const getters = {
  categoryView(state) {
    return state.goodsData.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsData.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsData.spuSaleAttrList || []
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}