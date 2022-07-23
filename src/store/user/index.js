import { getCode, registerUser, loginUser, getUserInfo, logoutUser } from "@/api";
import { setToken, getToken, clearToken } from "@/utils/token";
const actions = {
  async getCode(content, phone) {
    let result = await getCode(phone)
    if (result.code == 200) {
      content.commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async registerUser(content, userInfo) {
    let result = await registerUser(userInfo)
    console.log(result);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async loginUser(content, userInfo) {
    let result = await loginUser(userInfo)
    if (result.code == 200) {
      content.commit('LOGINUSER', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async getUserInfo(content) {
    let result = await getUserInfo()
    if (result.code == 200) {
      content.commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async logoutUser(content) {
    let result = await logoutUser()
    if (result.code == 200) {
      content.commit('LOGOUTUSER')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETCODE(state, value) {
    state.code = value
  },
  LOGINUSER(state, value) {
    state.token = value
  },
  GETUSERINFO(state, value) {
    state.userInfo = value
  },
  LOGOUTUSER(state) {
    state.token = ''
    state.userInfo = {}
    clearToken()
  }
}
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const getters = {}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}