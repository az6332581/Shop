import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from '@/pages/Home/HomePage.vue'
import LoginPage from '@/pages/Login/LoginPage.vue'
import RegisterPage from '@/pages/Register/RegisterPage.vue'
import SearchPage from '@/pages/Search/SearchPage.vue'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (loc, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, loc, resolve, reject)
  } else {
    originPush.call(this, loc, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (loc, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, loc, resolve, reject)
  } else {
    originReplace.call(this, loc, () => { }, () => { })
  }
}

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: HomePage,
      meta: { showpage: true }
    },
    {
      path: '/search/:keyword?',
      component: SearchPage,
      meta: { showpage: true },
      name: 'search',
      // props:true
      // props($route){
      //   return {
      //     searchInput:$route.params.searchInput,
      //     input:$route.jqery.input
      // }}
      props: ($route) => ({ keyword: $route.params.keyword, category: $route.query })
    },
    {
      path: '/login',
      component: LoginPage,
      meta: { showpage: false }
    },
    {
      path: '/reguster',
      component: RegisterPage,
      meta: { showpage: false }
    },
    {
      path: '/',
      redirect: '/home',
    }
  ]
})