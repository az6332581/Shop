import requests from "./request";
import mockrequests from './mockrequest'

export const getCategoryList = () => {
  return requests({
    url: 'product/getBaseCategoryList',
    method: 'get'
  })
}

export const getBannerData = () => {
  return mockrequests({
    url: '/banner',
    method: 'get'
  })
}

export const getFloorData = () => {
  return mockrequests({
    url: '/floor',
    method: 'get'
  })
}

export const getSearchData = (param) => {
  return requests({
    url: '/list',
    method: 'post',
    data: param
  })
}

export const getGoodsData = (param) => {
  return requests({
    url: `/item/${param}`,
    method: 'get',
  })
}

export const sendShopCart = (pdid, count) => {
  return requests({
    url: `/cart/addToCart/${pdid}/${count}`,
    method: 'post',
  })
}

export const getCartList = () => {
  return requests({
    url: `/cart/cartList`,
    method: 'get',
  })
}

export const delCartList = (pdid) => {
  return requests({
    url: `/cart/deleteCart/${pdid}`,
    method: 'delete',
  })
}

export const updateChecked = (pdid, isChecked) => {
  return requests({
    url: `/cart/checkCart/${pdid}/${isChecked}`,
    method: 'get',
  })
}

export const getCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

export const registerUser = (data) => {
  return requests({
    url: `/user/passport/register`,
    data,
    method: 'post'
  })
}

export const loginUser = (data) => {
  return requests({
    url: `/user/passport/login`,
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    method: 'get'
  })
}

export const logoutUser = () => {
  return requests({
    url: `/user/passport/logout`,
    method: 'get'
  })
}

export const findUserAddressList = () => {
  return requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: 'get'
  })
}

export const getTrade = () => {
  return requests({
    url: `/order/auth/trade`,
    method: 'get'
  })
}

export const submitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })
}

export const getOrderInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}