import vueLazyload from 'vue-lazyload'
import Vue from "vue";
const loadimage = require('@/assets/giphy.gif')


Vue.use(vueLazyload, {
  loading: loadimage,
})