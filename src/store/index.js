// 需要在main.js中引用当前js
// vuex的入口
import Vue from 'vue'
import Vuex from 'vuex'
// 这里引入的名称不能随意改，引用自己的文件夹一定要加./
import mutations from './mutations'
import actions from './action'
// 使用插件
Vue.use(Vuex);

// 用于管理状态
const state = {
  username:'',//登录用户名
  cartCount:0//购物车商品数量，默认0
}

// 导入对象
export default new Vuex.Store({
  // 这里是key和value值一样时的简写格式
  state,
  mutations,
  actions
});

