/**
 * 商城Vuex-mutations
 */
// 定义方法，在index.js中引用
export default {
  saveUserName(state, username) {
    // 读取参数
    state.username = username;
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  }
}