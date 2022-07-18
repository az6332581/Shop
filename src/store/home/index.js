import { getBannerData, getCategoryList, getFloorData } from "@/api/";
export default {
  namespaced: true,
  actions: {
    async getNavData(context) {
      let NavData = await getCategoryList()
      if (NavData.code === 200) {
        context.commit('GETNAVDATA', NavData.data)
      }
    },
    async getBannerData(context) {
      let BannerData = await getBannerData()
      if (BannerData.code === 200) {
        context.commit('GETBANNERDATA', BannerData.data)
      }
    },
    async getFloorData(context) {
      let FloorData = await getFloorData()
      if (FloorData.code === 200) {
        context.commit('GETFLOORDATA', FloorData.data)
      }
    },
  },
  mutations: {
    GETNAVDATA(state, value) {
      state.NavData = value
    },
    GETBANNERDATA(state, value) {
      state.BannerData = value
    },
    GETFLOORDATA(state, value) {
      state.FloorData = value
    }
  },
  state: {
    NavData: [],
    BannerData: [],
    FloorData: []
  },
  getters: {}
};