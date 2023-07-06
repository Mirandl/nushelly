/**
 * 商城Vuex-actions
 */
// 定义方法，导出object对象，在index.js中引用
export default {
  saveUserName(context,username){
    // 传输参数
    context.commit('saveUserName', username);
  },
  saveCartCount(context, count) {
    context.commit('saveCartCount', count);
  }
}