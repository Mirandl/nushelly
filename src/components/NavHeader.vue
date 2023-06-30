<template>
  <div class="header">
  <!-- 顶部条 -->
    <div class="nav-topbar">
     <!-- 容器 -->
      <div class="container">
       <!-- 左侧菜单信息 -->
        <div class="topbar-menu">
          <a href="javascript:;">果壳里官方</a>
          <a href="javascript:;">DOI个性化定制</a>
          <a href="javascript:;">云协同</a>
          <a href="javascript:;">我要入驻</a>
          <a href="javascript:;">果果周边</a>
          <a href="javascript:;">协议规则</a>
          <a href="javascript:;">协议规则</a>
          <a href="javascript:;">下载APP</a>
          <a href="javascript:;">Change Location</a>
        </div>
        <!-- 右侧用户信息 -->
        <div class="topbar-user">
            <!-- 如果有username就加载用户名 -->
          <a href="javascript:;" v-if="username">{{username}}那菈</a>
          <!-- 如果没有用户名才显示登录 -->
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <!-- 如果有username就加载退出-->
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <!-- 如果有username就加载我的订单 -->
          <a href="/#/order/list" v-if="username">我的订单</a>
          <!-- 点击之后跳转到购物车 -->
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <!-- 左侧logo可视化区 -->
        <div class="header-logo">
        <!-- 点击logo跳转 -->
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
              <span>推荐</span>
          </div>
          <div class="item-menu">
              <span>3折疯抢</span>
          </div>
          <!-- 直接读取后台数据，当数据量大时，用key自动缓存，渲染速度更高，复用率更高
          <li class="product" v-for="(item,index) in phoneList" :key="index">
            v-bind绑定id属性 
            <a v-bind:href="'/#/product/'+item.id" target="_blank">
              <div class="pro-img">
                  动态渲染图片
                <img v-lazy="item.mainImage" :alt="item.subtitle">
              </div>
              <div class="pro-name">{{item.name}}</div>
              加过滤器currency
              <div class="pro-price">{{item.price | currency}}</div>
            </a>
          </li> -->
          <div class="item-menu">
            <span>国潮破茧</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'../../public/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
              <span>甜酷多巴胺</span>
              <!-- 嵌套可展开的子盒子 -->
              <div class="children"></div>
          </div>
          <div class="item-menu">
              <span>极简随性</span>
          </div>
          <div class="item-menu">
              <span>售后服务</span>
          </div>
          <div class="item-menu">
              <span>社区共享</span>
          </div>
        </div>
        <!-- 导航 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    name: 'nav-header',
    // 定义局部data，防止数据污染
    data(){ 
      return {
        phoneList:[]
      }
    },
    computed:{
      /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      ...mapState(['username','cartCount'])
    },
    // 局部过滤器，vue1.0中currency是内置过滤器，2.0之后需要手动定义
    // 用于将金额格式化，日期格式化等
    filters:{
        currency(val) {
        // 如果值为空就返回0.00
            if (!val) return '0.00';
        // 给val四舍五入两位，加单位
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      this.getProductList();
      let params = this.$route.params;
      if(params && params.from == 'login'){
        this.getCartCount();
      }
    },
    methods: {
        // 与后端交互，获取数据
    // 登录跳转
      login(){
        this.$router.push('/#/login');
      },
      getProductList(){
        this.axios.get('/products',{
            params: {
            // 传参
            categoryId:'100012',
            pageSize:6
          }
        }).then((res) => {
            // Math.max(res.list, 6);
            /* if (res.list.length >= 6) {
                this.phoneList = res.list.slice(0, 6);
            } */
          this.phoneList = res.list;
        })
      },
      getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          this.$message.success('退出成功');
          this.$cookie.set('userId','',{expires:'-1'});
          this.$store.dispatch('saveUserName','');
          this.$store.dispatch('saveCartCount','0');
        })
        },
    //   购物车跳转
        goToCart() {
        // 取参router.params或者router.query，router.push跳转
        this.$router.push('/cart');
      }
    }
  }
</script>
<!-- lang标明书写css的样式类型 有scss css less 默认是css -->
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:$colorB;
      color:$colorG;
      .container{
        // 抽离功能，增加复用性
        @include flex();
        a{
          display:inline-block;
          color:$colorG;
          // 增加间距
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:$colorA;
          text-align:center;
          color:#ffffff;
          margin-right:0;
          // 购物车图标
          .icon-cart{
            @include bgImg(16px,12px,'../../public/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      // 整个在中央容器里
      .container{
        position:relative;
        height:112px;
        @include flex();
        // 中间分类导航区
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          // 设置小标题样式
          .item-menu{
            display:inline-block;
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;
            }
            // 下拉菜单
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                //显示出来
                opacity:1;
                border-top:1px solid #E5E5E5;
              }
            }
            .children{
              position:absolute;
              top:112px;
              left:0;
              width:1226px;
              height:0;
              //先隐藏
              opacity:0;
              overflow:hidden;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              // 动画
              transition:all .5s;
              // 设置背景颜色为白色
              background-color: #ffffff;
              .product{
                // 子绝父相
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                    // 把a撑开
                  display:inline-block;
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                    //下拉商品图片
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                //商品之间的分割线
                &:before{
                  // 空元素需要占位
                  content:' ';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            // 居中
            align-items:center;
            input{
              border:none;
              // 将边框和内边距的值包含在 width 内
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              // 输入框左侧有段距离
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'../../public/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }
</style>