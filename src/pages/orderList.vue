<template>
  <div class="order-list">
  <!-- 标题 -->
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，安全购物</span>
      </template>
    </order-header>
    <!-- 正文 -->
    <div class="wrapper">
    <!-- 内容区 -->
      <div class="container">
      <!-- 订单正文 -->
        <div class="order-box">
        <!-- 整个订单的加载动画 -->
          <loading v-if="loading"></loading>
          <!-- 订单列表 -->
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                  <!-- 每个订单的图片展示有懒加载 -->
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <!-- 显示未支付，快去支付吧 -->
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <!-- 分页器 -->
          <el-pagination
            v-if="true"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
            >
            <!-- 
            通过v-if来选择是否使用分页器
            设置class类别，单独设置分页器格式颜色
            background背景颜色，写上就是有了
            layout表示上一页，分页器和下一页
            动态绑定pagesize的值是"pageSize"的值，在后面data return里指定一页10条
            动态绑定total的值是"total"的值，接收从后端发回来的数据
            绑定自定义事件
             -->
          </el-pagination>
          <!-- 点击按钮，往后继续加载下一页 -->
          <!-- <div class="load-more" v-if="false"> -->
          <div class="load-more" v-if="showNextPage">
          <!-- 通过类来控制按钮布局，让块级元素下的行内元素居中。如果在el-buttun只会让按钮中的文字居中 -->
          <!-- 类型是初始类型，绑定加载为本页面已有的loading变量，点击时就会有loading动画 -->
              <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <!-- 往下滚动到距离底部410像素时开始加载下一页的内容 -->
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false"
          > 
          <!-- 当滚动时会触发scrollMore方法 -->
          <!--加载动画 ，由loading控制-->
            <img src="../../public/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <!-- 3.引用组件--放在结构的最下面 --只有当loading动画是false并且获取的订单数量为0才加载-->
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 1. 导入需要的组件
  import OrderHeader from './../components/OrderHeader'
  import Loading from './../components/Loading'
  import NoData from './../components/NoData'
  // 引入分页器和按钮组件
  import { Pagination,Button } from 'element-ui'
  // 引入无限滚动组件
  import infiniteScroll from 'vue-infinite-scroll'
  export default{
    name:'order-list',
    components:{
      // 2. 注册组件
      OrderHeader,
      Loading,
      NoData,
      // 动态加载分页器名称--中括号获取字符串el-pagination
      [Pagination.name]:Pagination,
      // Button.name即el-button
      [Button.name]:Button
    },
    directives: {
      // 配置 无限滚动组件 指令
      infiniteScroll
    },
    data(){
      return {
        loading:false,
        list:[],
        pageSize:10,// 一页19条
        pageNum:1,// 当前是第一页
        total:0,// 初始化总条数，之后重新赋值
        showNextPage:true,//加载更多：是否显示按钮，如果有下一页true就显示，false就不显示
        busy:false,//滚动加载，是否触发，默认开启触发。如果是busy就不会触发滚动
      }
    },
    mounted(){
      this.getOrderList();
    },
    methods:{
      // loading控制加载动画是否显示，busy显示滚动加载是否触发
      getOrderList(){
        // 默认先显示动画
        this.loading = true;
        // 默认禁用滚动加载
        this.busy = true;
        this.axios.get('/orders',{
          params:{
            // 从后端接收参数
            pageSize:10,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          // 当获取到路由时，关闭loading动画
          this.loading = false;
          // 每获得一次list都与上次的拼接
          this.list = this.list.concat(res.list);
          // 从后端返回total数量，这样分页器会自动计算分几页
          this.total = res.total;
          // 后端返回接口判断有无下一页
          this.showNextPage = res.hasNextPage;
          // 当收到返回值时，释放，启用滚动加载
          this.busy = false;
        }).catch(()=>{
          // 如果报错了同样也关闭掉动画
          this.loading = false;
        })
      },
      goPay(orderNo){
        // 三种路由跳转方式
        // this.$router.push('/order/pay')
        /*this.$router.push({
          // 跳转
          name:'order-pay',
          //传参
          query:{
            orderNo
          }
        })*/
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      // 第一种方法：分页器
      handleChange(pageNum){
        // 获取当前是第几页，重新获取订单列表
        this.pageNum = pageNum;
        this.getOrderList();
      },
      // 第二种方法：加载更多按钮
      loadMore(){
      // 变到第二页
        this.pageNum++;
        // 重新加载，但会覆盖之前的list，而且无法回退，因此选择拼接
        this.getOrderList();
      },
      // 第三种方法：滚动加载，通过npm插件实现
      scrollMore(){
        // 一旦触发滚动事件就设置为繁忙，避免重复触发
        this.busy = true;
        // 每0.5秒触发一次，防止一直刷新请求
        setTimeout(()=>{
          this.pageNum++;
          this.getList();
        },500);
      },
      // 专门给scrollMore使用
      getList(){
        // 发出请求就显示加载动画
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageSize:10,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list);
          // 请求结束时不显示加载动画
          this.loading = false;
          // 如果后端传来的接口显示有下一页，就继续显示
          if(res.hasNextPage){
            this.busy=false;
          }else{
            // 如果没有下一页就禁用滚动了
            this.busy=true;
          }
        });
      },
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          // 靠右对齐
          text-align:right;
        }
        // 局部设置分页器背景颜色，也可以单独写一个scss样式文件更改并引入到这
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: $colorA;
        }
        // primary表示设定主色
        .el-button--primary{
          background-color: $colorA;
          border-color: $colorA;
        }
        // 用这种单独为某个功能设定主题色的方式，如果组件多了就很麻烦
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>