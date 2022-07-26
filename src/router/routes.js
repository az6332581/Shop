export default [
  {
    path: '/home',
    component: () => import('@/views/Home/HomePage.vue'),
    meta: { showpage: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search/SearchPage.vue'),
    meta: { showpage: true },
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
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { showpage: false }
  },
  {
    path: '/register',
    component: () => import('@/views/Register/RegisterPage.vue'),
    meta: { showpage: false }
  },
  {
    path: '/detail/:pdid',
    component: () => import('@/views/Detail/DetailPage.vue'),
    meta: { showpage: true }
  },
  {
    path: '/AddCartSuccess',
    name: 'AddCartSuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: { showpage: true }
  },
  {
    path: '/ShopCart',
    component: () => import('@/views/ShopCart'),
    meta: { showpage: true }
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: { showpage: true },
    beforeEnter(to, from, next) {
      if (from.path == '/ShopCart' || from.path == '/login') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { showpage: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysussess',
    component: () => import('@/views/PaySuccess'),
    meta: { showpage: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    meta: { showpage: true },
    children: [{
      path: 'myorder',
      component: () => import('@/views/Center/myOrder')
    }, {
      path: 'grouporder',
      component: () => import('@/views/Center/groupOrder')
    },
    {
      path: '/center',
      redirect: '/center/myorder'
    }]
  },
  {
    path: '/',
    redirect: '/home',
  }

]