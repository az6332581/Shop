import axios from "axios";
import nprogress from "nprogress";
import store from "@/store";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: '/api',
  timeout: 10000
})

requests.interceptors.request.use((config) => {
  if (store.state.detailInfo.uuid_token) {
    config.headers.userTempId = store.state.detailInfo.uuid_token
  }
  if (store.state.userInfo.token) {
    config.headers.token = store.state.userInfo.token
  }
  nprogress.start()
  return config
})

requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return Promise.reject(err)
})


export default requests

