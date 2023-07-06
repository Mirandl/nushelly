<template>
  <!-- 导航桥 -->
  <!-- 用变量来控制是否属于isfixed这个类，如果是true就遵循这个类的样式 -->
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
    <!-- 左侧动态传入产品名称 -->
      <div class="pro-title">
        {{title}}
      </div>
      <!-- 右侧参数说明 -->
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <!-- 使用插槽，框架一样，随意定制功能 -->
        <!-- 设置span的左右间距以及btn的左间距 -->
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-bar',
    props:{
      title:String
    },
    data(){
      return {
        // 默认不需要定位--不吸顶
        isFixed:false
      }
    },
    mounted(){
      // 监听滚动事件，默认第三个参数是true-捕获
      window.addEventListener('scroll',this.initHeight)
    },
    methods:{
      initHeight(){
        // 取y轴偏移量，取不到就去scrolltop，再取不到就取body的scrolltop
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 当高度超过152就奖isfixed设为true，需要固定定位
        this.isFixed = scrollTop > 152? true:false;
      }
    },
    // 利用生命周期的破坏this.initHeight事件，并改为false即冒泡
    destroyed(){
      window.removeEventListener('scroll',this.initHeight,false)
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .nav-bar{
    height:70px;
    line-height:70px;
    border-top:1px solid $colorH;
    // 只设置上边框，吸顶标题部分的背景色为白色。且优先在上面显示
    background-color:$colorG;
    z-index:10;
    // 设置固定定位--吸顶
    &.is_fixed{
      position:fixed;
      top:0;
      width:100%;
      // 有吸顶时才有阴影
      box-shadow: 0 5px 5px $colorE;
    }
    .container{
      // 用flex布局，采用最简单的布局实现两端对齐
      @include flex();
      .pro-title{
        font-size:$fontH;
        color:$colorB;
        font-weight:bold;
      }
      .pro-param{
        font-size:$fontJ;
        span{
          margin:0 10px;
        }
        a{
          color:$colorC;
        }
      }
    }
  }
</style>