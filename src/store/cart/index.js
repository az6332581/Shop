import { getCartList, delCartList, updateChecked } from '@/api'
const actions = {
  async getCartList(content) {
    let result = await getCartList()
    if (result.code == 200) {
      content.commit('GETCARTLIST', result.data)
    }
  },
  async delCartList(content, value) {
    let result = await delCartList(value)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async updateChecked(content, { pdid, isChecked }) {
    try {
      await updateChecked(pdid, isChecked)
      return 'ok'
    } catch (error) {
      return Promise.reject(new Error('fail'))
    }
  },
  delchoose(content) {
    let resultAll = []
    content.getters.cartList.cartInfoList.forEach(item => {
      let result = item.isChecked == 1 ? content.dispatch('delCartList', item.skuId) : ''
      resultAll.push(result)
    });
    return Promise.all(resultAll)
  },
  updateAllChecked(content, isChecked) {
    let resultAll = []
    content.getters.cartList.cartInfoList.forEach((item) => {
      let result = content.dispatch('updateChecked', { pdid: item.skuId, isChecked })
      resultAll.push(result)
    })
    return Promise.all(resultAll)
  }
}
const mutations = {
  GETCARTLIST(state, value) {
    state.CartList = value
  }
}
const state = {
  CartList: []
}
const getters = {
  cartList(state) {
    return state.CartList[0] || {}
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}