<template>
    <!-- 底部导航结构 -->
  <div class="footer">
    <!-- logo -->
    <div class="footer-logo">
      <img src="../../public/imgs/guo-logo.png" alt="">
      <p>果壳里 超购商城</p>
    </div>   
    <!-- 底部链接           -->
    <div class="footer-link">
      <a href="https://www.tmall.com/?spm=a1z10.1-b-s.0.0.4ed55f3btiVhRW" target="_blank">果壳里天猫店</a><span>|</span>
      <a href="https://rulechannel.tmall.com/#/" target="_blank">果壳里平台规则</a><span>|</span>
      <a href="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f516fe9e2c01.html" target="_blank">儿童信息保护规则</a><span>|</span>
      <a href="https://m.mi.com/support/module?id=63&headless=1" target="_blank">商家隐私政策</a><span>|</span>
      <a href="https://rulechannel.tmall.com/?type=detail&ruleId=20001254&cId=1373#/rule/detail?ruleId=20001254&cId=1373" target="_blank">果壳里商城用户协议</a><span>|</span>
      <a href="https://static.mi.com/feedback/" target="_blank">问题反馈</a>
    </div>
    <!-- 版权 -->
    <div class="copyright">Copyright ©2023 <span class="domain">nushelly.prettygirl.com</span> All Rights Reserved.</div>
    <div>违法和不良信息举报电话：171-5104-4404 知识产权侵权投诉 本网站所列数据，除特殊说明，所有数据均出自本实验室测试</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
  @import './../assets/scss/config.scss';
// scoped就是设置当前局部组件的样式，只能在当前组件起作用,就是别的组件修改当前组件的时候默认不被修改！
  .footer{
    height:290px;
    border-top:4px solid $colorA;
    background-color:#333;
    color:#999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:27px;
      margin-bottom:20px;
      img{
        width:120px;
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
        margin-bottom: 10px;
      .domain{
        color:$colorA;
      }
    }
  }
</style>