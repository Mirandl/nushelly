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
  mounted(){
      if (this.$cookie.get('userId')) {
        // 调用两个方法
      this.getUser();
      this.getCartCount();
    }
  },
    methods: {
    // 实时拉取用户信息
    getUser(){
        this.axios.get('/user').then((res = {}) => {
        // 保存到vuex里面
        this.$store.dispatch('saveUserName',res.username);
      })
        },
    // 获取购物车数量
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
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
