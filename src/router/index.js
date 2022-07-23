import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import store from "@/store";

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


let router = new VueRouter({
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  let token = store.state.userInfo.token
  let name = store.state.userInfo.userInfo.name
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('userInfo/getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('userInfo/logoutUser')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})



export default router