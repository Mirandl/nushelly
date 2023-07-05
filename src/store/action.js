/**
 * 商城Vuex-actions
 */
// 定义方法，导出bject对象，在index.js中引用
export default {
  saveUserName(context,username){
    context.commit('saveUserName', username);
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  }
}