<template>
    <!-- 主class就能够区分作用域，不需要给style添加scoped作用域了 -->
  <div class="order-header">
    <!-- 限制在安全区内 ，其中内容均使用浮动，父级就需清除浮动解决塌陷-->
    <div class="container clearfix">
        <!-- logo样式复用 -->
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <!-- 使用插槽来动态变更提示的文字 -->
        <!-- 从外部接收title -->
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'order-header',
    props:{
      title:String
    },
    computed:{
      ...mapState(['username'])
    },
  }
</script>
<style lang="scss">
  .order-header{
    padding:30px 0;
    border-bottom:2px solid #e3646a;
    .header-logo{
      float:left;
    }
    .title,.username{
        // 转为行内块元素，这样右边的用户名盒子也能在同一排
      display:inline-block;
      height:55px;
      line-height:55px;
    }
    .title{
      float:left;
      margin-left:54px;
      h2{
        // h2本身带的样式的优先级高于title，会覆盖其样式，因此需要给h2单独设置字体大小
        font-size:28px;
        color:#333333;
      }
      span{
        font-size:14px;
        margin-left:17px;
        color:#999999;
        font-weight:200;//加粗
      }
    }
    .username{
      float:right;
      a{
        // a链接的样式优先级高于class，所以需要在a里面设置颜色
        color:#666666;
        font-size:16px;
      }
    }
  }
</style>