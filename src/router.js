import Vue from 'vue'
import Router from 'vue-router'
// 组件习惯大写
import Home from './pages/home'
// import Login from './pages/login'
import Index from './pages/index'
/* 在component中定义完组件名字,还需要去通过import去引入组件.
component:Home这种方法不推荐,虽然易理解，但缺点:
webpack在打包的时候会把整个路由打包成一个js文件，如果页面一多，会导致这个文件非常大，加载缓慢 */
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Cart from './pages/cart'
// import Order from './pages/order'
// import OrderConfirm from './pages/orderConfirm'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'
// import AliPay from './pages/alipay'
// 通过vue加载路由插件
Vue.use(Router);

// 创建并暴露一个router
export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:Home,
      redirect:'/index',
      children:[
        {
          path: 'index',
          name: 'index',
          component: Index,
        }, {
          path: 'product/:id',
          name: 'product',
          component: () => import('./pages/product.vue')
        }, {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('./pages/detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue')
    //   component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./pages/register.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order.vue'),
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue')
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue')
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay.vue')
        }
      ]
    }
  ]
});