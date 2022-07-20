import HomePage from '@/pages/Home/HomePage.vue'
import LoginPage from '@/pages/Login/LoginPage.vue'
import RegisterPage from '@/pages/Register/RegisterPage.vue'
import SearchPage from '@/pages/Search/SearchPage.vue'
import DetailPage from "@/pages/Detail/DetailPage.vue";

export default [
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
    path: '/detail/:pdid',
    component: DetailPage,
    meta: { showpage: true }
  },
  {
    path: '/',
    redirect: '/home',
  }
]