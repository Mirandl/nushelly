<template>
<!-- 首页 -->
  <div class="index">
    <!-- 容器区 -->
    <div class="container">
      <!-- 轮播图 -->
      <div class="swiper-box">
        <!-- 左侧菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <!-- 分类商品栏 -->
            <li class="menu-item">
              <a href="javascript:;">女装热销分类</a>
              <div class="children">
                <!-- 当做数组，横向循环4次 -->
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                <!-- 纵向循环4次 -->
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <div class="border-radius">
                        <a v-bind:href="sub?'/#/product/'+sub.id:''">
                        <img v-bind:src="sub?sub.img:'https://gdp.alicdn.com/tps/i2/T1k2HJXexjXXauUnsh-180-180.png'" alt="">
                        {{sub?sub.name:'笔墨山河'}}
                        </a>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">女鞋/箱包</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">金石/配饰</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">护肤彩妆/个护</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">运动户外</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">美容/护理</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">养生保健</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">居家用品</a>
            </li>
          </ul>
        </div>
        <swiper v-bind:options="swiperOption">
        <!-- 在循环列表里依次读取并播放，key方便缓存 -->
          <swiper-slide  class="swiperslide" v-for="(item,index) in slideList" v-bind:key="index">
            <!-- 动态获取 封装路由 -->
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <!-- 分页器 -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <!-- 左右箭头 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
            <!-- v-lazy会自动封装src -->
          <img v-lazy="item.img" alt="">
        </a>
      </div>

      <div class="banner">
        <a href="/#/product/1">
          <img src="https://h2.appsimg.com/b.appsimg.com/upload/mst/2023/05/19/30/ef5e78119e17838134ff4323197661ba.jpg!75.webp" alt="">
        </a>
      </div>
    </div>
    <!-- 商品 -->
    <div class="product-box">
      <div class="container">
        <h2>好物推荐</h2>
        <div class="wrapper">
          <!-- <div class="banner-left">
            <a href="/#/product/1"><img v-lazy="'../../../public/imgs/mix1.jpg'" alt=""></a>
          </div> -->
          <div class="list-box">
            <div class="list" v-for="(arr,i) in wearList" v-bind:key="i">
              <div class="item" v-for="(item,j) in arr" v-bind:key="j">
                <!-- 给新品加判断条件 -->
                <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                <h3>{{item.name}}</h3>
                <p>{{item.subtitle}}</p>
                <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
             </div>
            </div>
           </div>
          </div>
        </div>
    </div>
    <!-- </div> -->
    <service-bar></service-bar>
    <!-- 模态框-弹窗 -->
    <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal=false"
      >
      <!-- submit是自定义事件，点击提交之后从model.vue提交到index.vue，
        接收事件时，确定事件就跳转到购物车，取消事件就隐藏弹窗 -->
      <!-- 用模板定义弹框组件，用插槽来定义弹窗名称-body -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
 </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import Modal from './../components/Modal'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  //   从已安装的插件模板中找到这个cs样式文件
  import 'swiper/dist/css/swiper.css'
  export default{
    name:'index',
    components:{
      swiper,
      swiperSlide,
      ServiceBar,
      Modal
    },
    // 将data封装成函数后，在实例化组件的时候，我们只是调用了data函数生成的数据副本，避免了数据污染。
    data(){
      return {
        // 不使用return包裹的数据会在项目的全局可见，会造成变量污染，使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
          swiperOption: {
            // 轮播效果，自动播放，循环
            autoplay:true,
            loop:true,
            //   effect:'cube',
            effect:'fade',
            fadeEffect: {
                crossFade: true
            },
            //   分页器
            pagination: {
            el: '.swiper-pagination',
            // 点击下方小圆点就可以跳转到图片了
            clickable:true
           },
            // 前进后退 的导航，左右箭头
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
          },
        // 参与轮播的图片
        slideList:[
            // 有id的需要跳转
            {
            id:'2',
            img:'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2023/02/17/179/ias_87da35d83e02ac3273d7eb6684741693_1135x545_85.jpg'
          },
          {
            id:'3',
            img:'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2023/05/01/93/ias_da6b7f9e78adc4c08b42eb07746f2a4e_1135x545_85.jpg'
          },
            {
            // 无id不跳转
            id:'4',
            img:'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2023/07/24/70/ias_a6ebfed5e7ab1edefe6a452494de3330_1135x545_85.jpg'
          },
          {
            id:'5',
            img:'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2023/05/30/114/ias_47e0a4687d0db7d857ad8d33106d0d97_1135x545_85.jpg'
            }
        ],
        menuList:[
          [
            {
              id:30,
              img:'https://img.alicdn.com/imgextra/i4/2708303826/O1CN01TikVrO1e8MBqaigZr_!!2708303826.jpg',
              name:'新中式-拾白',
            },{
              id:31,
              img:'https://img.alicdn.com/imgextra/i1/205262565/O1CN01Vz6xiV1UookCEcCN8_!!205262565.jpg_400x400.jpg',
              name:'新中式-素萝',
            },{
              id:32,
              img:'https://gd1.alicdn.com/imgextra/i1/343229424/O1CN016QmVxO2JUFKlT8iwQ_!!343229424.jpg_400x400.jpg',
              name:'新中式-仰世',
            },{
              id:33,
              img:'https://img.alicdn.com/imgextra/i4/2903512110/O1CN01RczE4x1RSQOFXUqVd_!!2903512110.jpg_400x400.jpg',
              name:'新中式-卿棠',
            }
          ],
          [{
              id:30,
              img:'https://gdp.alicdn.com/bao/uploaded/i4/2200533449572/O1CN016JNlFE2Ka1xwdcqGs_!!2200533449572.png_310x310.jpg',
              name:'盐甜系-小川',
            },{
              id:31,
              img:'https://gd3.alicdn.com/imgextra/i3/2200824903503/O1CN01O3GJvB1bkQGwSMVVO_!!2200824903503.jpg_400x400.jpg',
            //   img:'../../public/imgs/item-box-2.png',
              name:'盐甜系-乔与花樽',
            },{
              id:32,
              img:'https://img.alicdn.com/imgextra/i1/385335622/O1CN01chrVQQ1rOvUWEVNl4_!!385335622.jpg_400x400.jpg',
              name:'盐甜系-芝士日',
            },{
              id:33,
              img:'https://img.alicdn.com/imgextra/i2/2596637413/O1CN01LFIGTp24dCrBVN294_!!2596637413.jpg_400x400.jpg',
              name:'盐甜系-鹿向南',
                }],
            [{
              id:30,
              img:'https://gd2.alicdn.com/imgextra/i4/36174144/O1CN01tCWqNg1gU09495hLk_!!36174144.jpg_400x400.jpg',
              name:'轻文艺-两人出品',
            },{
              id:31,
              img: 'https://img.alicdn.com/bao/uploaded/i4/392243499/O1CN01YBMAHC1biagkBnRrX_!!392243499.jpg_310x310.jpg',
            //   https://img.alicdn.com/imgextra/i2/392243499/O1CN01DGuii81biafDC8M3c_!!392243499.jpg_400x400.jpg
              name:'轻文艺-远家',
            },{
              id:32,
              img:'https://img.alicdn.com/bao/uploaded/i4/38656902/O1CN01o4ZxkS20rATxRAOBQ_!!38656902.jpg_240x240.jpg',
              name:'轻文艺-无谓',
            },{
              id:33,
              img:'https://img.alicdn.com/bao/uploaded/i2/1090075020/O1CN01N7TEIQ1mxD4w4fnXK_!!1090075020.jpg_240x240.jpg',
              name:'轻文艺-小耳',
                }],
            [
            {
              id:30,
              img:'https://img.alicdn.com/imgextra/i4/2708303826/O1CN01TikVrO1e8MBqaigZr_!!2708303826.jpg',
              name:'新中式-拾白',
            },{
              id:31,
              img:'https://img.alicdn.com/imgextra/i1/205262565/O1CN01Vz6xiV1UookCEcCN8_!!205262565.jpg_400x400.jpg',
              name:'新中式-素萝',
            },{
              id:32,
              img:'https://gd1.alicdn.com/imgextra/i1/343229424/O1CN016QmVxO2JUFKlT8iwQ_!!343229424.jpg_400x400.jpg',
              name:'新中式-仰世',
            },{
              id:33,
              img:'https://img.alicdn.com/imgextra/i4/2903512110/O1CN01RczE4x1RSQOFXUqVd_!!2903512110.jpg_400x400.jpg',
              name:'新中式-卿棠',
            }
            ]
        ],
        adsList:[
          {
            id:33,
            img:'https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/07/21/190/1689921979647_756x500_90.jpg'
          },{
            id:48,
            img:'https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/07/21/89/1689922008925_756x500_90.jpg'
          },{
            id:45,
            img:'https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/07/21/16/1689921992593_756x500_90.jpg'
          },{
            id:47,
            img:'https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/28/124/1687935916573_756x500_90.jpg'
          }
        ],
        wearList: [
              [{
                id: 1,
                categoryId: 3,
                name: '游园梦境',
                subtitle:'复古日系无袖亚麻炒色',
                mainImage: require('./../../public/imgs/mix1.jpg'),
                status:1,
                price: 399.00
            },{
                id: 1,
                categoryId: 3,
                name: '游园梦境',
                subtitle:'复古日系无袖亚麻炒色',
                mainImage: 'https://img.alicdn.com/imgextra/i1/362703105/O1CN01TpHUe21Yo8cjB51ug_!!362703105.jpg_400x400.jpg',
                status:1,
                price: 399.00
            },
            {
                id: 1,
                categoryId: 3,
                name: '绿野仙踪',
                subtitle:'文艺多巴胺撞色开衫外搭',
                mainImage: 'https://img.alicdn.com/imgextra/i4/362703105/O1CN01zOnjsc1Yo8dUkEijA_!!362703105.jpg_400x400.jpg',
                status:1,
                price: 399.00
            },{
                id: 1,
                categoryId: 3,
                name: '香农夫人',
                subtitle:'新款宫廷文艺蓝色纯色小飞袖',
                mainImage: 'https://img.alicdn.com/bao/uploaded/i3/362703105/O1CN01xVBeXH1Yo8ds8J0aF_!!362703105.jpg_400x400.jpg',
                status:1,
                price: 599.00
            },{
                id: 1,
                categoryId: 3,
                name: '吟风者',
                subtitle:'文艺宽松半袖双层多巴胺拼色',
                mainImage: 'https://img.alicdn.com/bao/uploaded/i3/362703105/O1CN01WrSLLo1Yo8dtzzegh_!!362703105.jpg_400x400.jpg',
                status:1,
                price: 368.00
            },{
                id: 1,
                categoryId: 3,
                name: '蓝色芭蕾',
                subtitle:'夏季新款宫廷风荷叶领无袖',
                mainImage: 'https://img.alicdn.com/imgextra/i3/362703105/O1CN019dRZKP1Yo8cZKJ6CF_!!362703105.jpg_400x400.jpg',
                status:1,
                price: 389.00
                  }],
              [{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: 'https://gw.alicdn.com/imgextra/i4/2209697117130/O1CN01VdEZa222XanUO20ef-2209697117130.jpg_Q75.jpg_.webp',
                status:1,
                price: 7199.22
            },
            {
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
                  }],[{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: 'https://gw.alicdn.com/imgextra/i4/2209697117130/O1CN01VdEZa222XanUO20ef-2209697117130.jpg_Q75.jpg_.webp',
                status:1,
                price: 7199.22
            },
            {
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
            },{
                id: 1,
                categoryId: 3,
                name: 'iphone7',
                subtitle:'双十一促销',
                mainImage: '../../public/imgs/detail/phone-1.jpg',
                status:1,
                price: 7199.22
                  }]
        ],
            // 默认不显示弹框，只有在点击时才显示
        showModal:false
      }
    },
    mounted() {
    // 初始化商品
      this.init();
    },
    methods: {
        // 获取商品列表
      init(){
        this.axios.get('/products',{
            params: {
            // 商品品类
            categoryId: 100012,
            // 要取过来的商品个数，原本的6个加现在需要的8个
            pageSize:14
          }
        }).then((res) => {
            // slice不会改变原数组
          res.list = res.list.slice(6,14);
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
        })
        },
    //   点击添加购物车,将商品id添加到购物车
      addCart(id){
        this.axios.post('/#/cart',{
          productId:id,
          selected: true
        }).then((res) => {
        // 加入购物车成功后，显示弹框
          this.showModal = true;
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);//实时获取购物车数量
        });
      },
      goToCart(){
        this.$router.push('/#/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .index{
    background-color: #fff;
    // 轮播图
    // 一层层嵌套，避免重名造成混乱
    .swiper-box{
      .nav-menu{
        position:absolute;
        width:264px;
        height:428px;
        z-index:9;
        padding:26px 0;
        background-color:#0e584abf;
        box-shadow: -2px -2px 15px 1px rgb(234, 228, 229) inset;
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:30px;
              &:after{
                position:absolute;
                right:30px;
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'../../public/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }
            .children{
              display:none;
              width:962px;
              height:428px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              ul{
                display:flex;
                padding-top: 5px;
                justify-content:space-between;
                height:100px;
                li{
                  height:100px;
                  line-height:100px;
                  flex:1;
                  padding-left:23px;
                }

                .border-radius {
                    position: relative;
                    width: 210px;
                    height: 65px;
                    margin: auto;
                    border: 1px solid $colorA;

                    &::before,
                    &::after {
                        content: "";
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        transition: .3s ease-in-out;
                    }
                    
                    &::before {
                        top: -5px;
                        left: -5px;
                        border-top: 1px solid $colorA;
                        border-left: 1px solid $colorA;
                    }
                    
                    &::after {
                        right: -5px;
                        bottom: -5px;
                        border-bottom: 1px solid $colorA;
                        border-right: 2px solid $colorA;
                        z-index:0;
                    }

                    &:hover::before,
                    &:hover::after {
                        width: calc(100% + 9px);
                        height: calc(100% + 9px);
                    }

                    a{
                    color:$colorB;
                    font-size:14px; 
                    }

                    img{
                    width:55px;
                    height:75px;
                    vertical-align:middle;
                    margin-right:15px;
                    }
                }
              }
            }
          }
        }
      }
      .swiper-pagination {
        width:400px;
        left:auto;
        right:30px;
        bottom:20px;
        text-align: right;
      }
      .swiperslide{
        a img{
            float:right;
            width:963px;
            box-shadow: 2px 2px 15px 1px #fff inset;
        }
      }
      .swiper-container {
        height: 428px;
        .swiper-button-prev{
          left:274px;
        }
        img{
          width:100%;
          height:100%;
        }
      }  
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;
      }
    }
    .banner{
      margin-bottom:50px;
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;
        //.banner-left{
        //  margin-right:16px;
        //  img{
        //    width:224px;
        //    height:619px;
        //  }
        //}
        .list-box{
          .list{
            @include flex();
            width:1226px;
            margin-bottom:14px;
            &:last-child{
              margin-bottom:0;
            }
            .item{
              width:236px;
              height:302px;
              background-color:#ececec;
              text-align:center;
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:$colorB;
                }
                &.kill-pro{
                  background-color:$colorA;
                }
              }
              .item-img{
                img{
                  width:auto;
                  height:195px;
                }
              }
              .item-info{
                h3{
                  padding-top: 10px;
                  font-size:$fontJ;
                  color:$colorB;
                  line-height:$fontJ;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 8px;
                }
                .price{
                  color:$colorA;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'../../public/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  

</style>