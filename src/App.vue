<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      
    }
  },
    mounted() {
    // 优化：屏蔽掉没有必要的接口
    // 如果能获取到用户id，表明是登陆了的状态
      if (this.$cookie.get('userId')) {
        // 调用两个方法
        this.getUser();
        this.getCartCount();
    }
  },
    methods: {
    // 实时拉取用户信息
        getUser() {
        // res用一个object对象占位
        this.axios.get('/user').then((res = {}) => {
        // 保存到vuex里面
        this.$store.dispatch('saveUserName',res.username);
      })
        },
    // 获取购物车数量
        getCartCount() {
        // 如果res为空，可能会报错，这里初始化为0
      this.axios.get('/cart/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
