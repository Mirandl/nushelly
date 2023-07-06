<template>
<!-- 本模型规定的是 关于点击购物车图标后，弹出商品添加成功等信息的弹框 的功能 -->

<!-- 定义下滑的动画过渡，需要把整个弹框的内容都包含进去，一起执行动画 -->
  <transition name="slide">
    <!-- v-show控制弹窗要不要显示 -->
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
        <!-- 弹窗头部 -->
        <div class="modal-header">
            <!-- 标题，可以接收外面传进来的名称 -->
          <span>{{title}}</span>
          <!-- 叉号-用来关闭弹窗的a标签，绑定了 取消 的点击事件 -->
          <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
        </div>
        <!-- 弹窗正文 -->
        <div class="modal-body">
            <!-- 插槽，可以在其中插入东西 -->
          <slot name="body"></slot>
        </div>
        <!-- 弹窗底部 -->
        <div class="modal-footer">
        <!-- btnType==1,只显示确认按钮，.emit是自定义事件，表示子组件向父组件index.vue提交，调用了父组件中的submit事件 -->
          <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
          <!-- 当btnType==2时，只显示取消按钮，将点击事件绑定cancel，并提交到index.vue，由他关闭弹窗 -->
          <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
          <!-- 按钮组合，有确认和取消，确定和取消之间需要设置间距 -->
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    name:'modal',
    props:{
        // 弹框类型：小small、中middle、大large、表单form，
        // 在不同弹框中赋予不同的值即可，类似ios桌面小组件
      modalType:{
        type:String,
        default:'form'  // 默认是表单格式 
      },
      // 弹框标题
      title:String,
      // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
      btnType:String,
      sureText:{
        type:String,
        default:'确定'
      },
      cancelText:{
        type:String,
        default:'取消'
        },
    //   控制弹窗要不要展示
      showModal:Boolean
    }
  }
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>