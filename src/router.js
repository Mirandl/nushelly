import Vue from 'vue'
import Router from 'vue-router'
// 组件习惯大写
import Home from './pages/home'
import Index from './pages/index'
/* 在component中定义完组件名字,还需要去通过import去引入组件.
component:Home这种方法不推荐,虽然易理解，但缺点:
webpack在打包的时候会把整个路由打包成一个js文件，如果页面一多，会导致这个文件非常大，加载缓慢 */
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
        //   按需加载--不会在一开始打包到项目中，不是立即执行，而是只有在访问路由时通过require按需加载，在通过resolve抛出去
        //   component:resolve=>require(['./pages/index.vue'],resolve),
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
    // 虽然order和cart结构上相似，但语义上还是分开了
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