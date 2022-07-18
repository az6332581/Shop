import requests from "./request";
import mockrequests from './mockrequest'

export const getCategoryList = () => {
  return requests({
    url:'product/getBaseCategoryList',
    method:'get'
  })
}

export const getBannerData = () => {
  return mockrequests({
    url:'/banner',
    method:'get'
  })
}

export const getFloorData = () => {
  return mockrequests({
    url:'/floor',
    method:'get'
  })
}

export const getSearchData = (param) => {
  return requests({
    url:'/list',
    method:'post',
    data:param
  })
}