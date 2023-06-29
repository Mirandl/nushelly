<template>
    <!-- 底部导航结构 -->
  <div class="footer">
    <!-- logo -->
    <div class="footer-logo">
      <img src="../../public/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>   
    <!-- 底部链接           -->
    <div class="footer-link">
      <a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a><span>|</span>
      <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a><span>|</span>
      <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a><span>|</span>
      <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程</a><span>|</span>
      <a href="https://coding.imooc.com/class/392.html" target="_blank">配套课程：Java通用型支付+电商平台双系统实战</a>
    </div>
    <!-- 版权 -->
    <div class="copyright">Copyright ©2023 <span class="domain">nushelly.futuremi.com</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
// scoped就是设置当前局部组件的样式，只能在当前组件起作用,就是别的组件修改当前组件的时候默认不被修改！
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333;
    color:#999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>