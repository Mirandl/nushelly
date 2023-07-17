<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
    <!-- v-html将源码复制到div中 -->
  </div>
</template>
<script>
  import Loading from './../components/Loading'
  export default{
    name:'alipay',
    components:{
      Loading
    },
    data(){
      return {
        orderId:this.$route.query.orderId,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        this.axios.post('/pay',{
          orderId:this.orderId,
          orderName:'精品服饰结算地',
          amount:0.01,//单位元
          payType:1 //1支付宝，2微信
        }).then((res) => {
            // 从后台返回的数据中得到data
          this.content = res.content;
          setTimeout(()=>{
            document.forms[0].submit();
          }, 100)
        //   过渡动画结束后重定向到收银台
        })
      }
    }
  }
</script>