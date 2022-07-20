import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
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
  routes,
  scrollBehavior() {
    return { y: 0 }
  }
})