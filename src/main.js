import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入store，默认读取其中的index.js对象--vuex
import store from './store'
import App from './App.vue'

// import env from './env'
// mock开关
// const mock = false;
// if(mock){
//   require('./mock/api');
// }
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
// 如果不是代理跨域，这里的路径还需要更改成其他网址
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = '/';
axios.defaults.timeout = 8000; 
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response){
    let res = response.data;
    let path = location.hash;// 带#的就是hash路由，我们获取这个路由
  if(res.status == 0){
    return res.data;
  } else if (res.status == 10) {//如果报错是10表示未登录
      if (path != '#/index') {
          //只有首页可以不登录浏览，当打开其他界面时都会跳转到登录页面先进行登录
          //如果当前已经在首页，就不需要跳转到登录页面
          window.location.href = '/#/login';
      }
    return Promise.reject(res);//一旦非0，报错，就返回return，避免再次入栈执行程序
  }else{// 如果报错非10才抛出异常
      Message.warning(res.msg);
    // 抛出异常，将res抛出去，使得之后需要以res为条件的代码都不能执行
    return Promise.reject(res);
  }
},
//http状态码请求失败
(error)=>{
  let res = error.response;
// 打印response返回结果的信息
  Message.error(res.data.message);
// 不写return会正常进入程序then，这里需要抛出异常
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);// 加载cookie
const loadimage = require('../public/imgs/loading-svg/loading-spinning-bubbles.svg')
const errorimage = require('../public/imgs/loading-svg/loading-spokes.svg')

Vue.use(VueLazyLoad, {
  preLoad: 1, // 预载高度比例
  error: errorimage,
  loading: loadimage,
  attempt: 2 //尝试加载的次数
})

// Vue.use(VueLazyLoad, {
//     // 全局配置--加载动画
//     // 图片有固定分辨率，超出分辨率会失真，而svg矢量图不管放多大多小都不会失真，但制作成本较高
//   loading:'../public/imgs/loading-svg/loading-bars.svg'
// })
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  // 将vuex实例对象放进来
  store,
  router,
  render: h => h(App),
}).$mount('#app')
