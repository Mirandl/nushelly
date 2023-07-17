<template>
  <div>
    <!-- orderheader由于在不同页面中不一样（标题和温馨提示的内容）
        要么单独在每个页面中开发（本项目采用），
        要么放在这个通用父组件order.vue，然后判断属于哪个页面 再做更改（注释） -->
    <order-header v-bind:title="title">
        <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <!-- 这里插入不同的子组件 -->
    <router-view></router-view>
    <!-- 预约维修、7天无理由退货 等 -->
    <service-bar></service-bar>
    <!-- 尾部组件 -->
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'order',
    data(){
      return {
        title:'',
        tip:''
      }
    },
    components:{
      ServiceBar,
      NavFooter
    },
    mounted() {
        // 获取路由地址
        let path = this.$route.path;
        if (path == '/order/copnfirm') {
            this.title = '订单确认';
            this.tip = '请认真填写收货地址';
        } else if (path == '/order/list') {
            this.title = '订单列表';
            this.tip = '谨防钓鱼链接或诈骗';
        } else if (path == '/order/pay') {
            this.title = '订单支付';
            this.tip = '谨防钓鱼链接或诈骗';
        } else {
            // alipay中间页
            this.title = '订单支付';
            this.tip = '谨防钓鱼链接或诈骗';
        }
    }
  }
</script>