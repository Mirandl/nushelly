<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请填写您的订单信息，尽快结算</span>
      </template>
    </order-header>
    <!-- 传入矢量图，比图片地址的代码量要小很多，因为不用发请求 -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- 地址栏 -->
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
                <!-- 遍历所有已选中的item进行渲染，其中绑定key作用-缓存组件，提高渲染速度 -->
                <!-- 当checkIndex与当前商品对应的index一致，就绑定checked类，更改选中样式；当点击时，将index赋值给checkIndex -->
              <div class="addr-info" :class="{'checked':index == checkIndex}" @click="checkIndex=index" v-for="(item,index) in list" :key="index">
                <!-- 渲染已选中商品的信息 -->
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <!-- 省+市+区+详细地址 -->
                <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                <div class="action">
                    <!-- a标签控制删除图标，点击后触发删除地址，传入参数是item.id -->
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <!-- svg矢量图保证高清不失真，且不占用带宽，拉取时只是一段代码而非图片地址 -->
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                   <!-- a标签控制编辑图标 -->cartList
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <!-- div标签控制新增地址，点击弹出地址编辑模态框 -->
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <!-- 要结算的商品列表 -->
          <div class="item-good">
            <h2>小果购物车要开动啦~</h2>
            <ul>
                <!-- 进行循环，加载已选中的购物车列表 -->
              <li v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName + '  ' + item.productSubtitle}}</span>
                </div>
                <!-- 来自后台数据 -->
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <!-- 后台计算 前端只是做数据拉取，渲染，交互-->
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>已享包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠减免：</span>
              <span class="item-val">-5元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <!-- 具体计算（包括优惠活动递减）都应该由后端完成 -->
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增地址弹框 -->
    <modal
      title="编辑收货地址"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <!-- 定义一个大容器，包括四个item -->
        <div class="edit-wrap">
          <div class="item">
            <!-- 当进入编辑框 编辑已有地址时，将读进来的item的一系列信息都一次赋给文本框 -->
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <!-- 设置三个下拉框，选择省市区，正常是在后端数据库中拉取 -->
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <!-- 详细地址 -->
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <!-- 邮编地址 -->
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <!-- 删除弹框 -->
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal=false"
      @submit="submitAddress"
    >
    <!-- 只有点击后，showDelModal变量变为true才显示showModal弹框 -->
    <!-- v-on:cancel==@cancel -->
      <template v-slot:body>
        <p>确认删除该地址吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Modal from './../components/Modal'  // 引入弹框
export default{
  name:'order-confirm',
  data(){
    return {
      list:[],//收货地址列表
      cartList:[],//购物车中需要结算的商品列表（仅已选择的）
      cartTotalPrice:0,//商品总金额
      count:0,//各个商品结算总数量
      checkedItem:{},//选中的商品对象
      userAction:'',//用户行为-定义在一个方法里，通过字段来区分 0：新增； 1：编辑； 2：删除
      showDelModal:false,//是否显示删除弹框，默认不显示
      showEditModal:false,//是否显示新增或者编辑弹框
      checkIndex:0//当前收货地址被选中所对应的索引
    }
  },
  components:{
    OrderHeader,
    Modal
    },
//   生命周期钩子
  mounted(){
    this.getAddressList();
    this.getCartList();
  },
  methods:{
      getAddressList() {
        // res得到的是data(){里面的东西}
      this.axios.get('/#/shippings').then((res)=>{
        this.list = res.list;
      })
    },
    // 打开新增地址弹框
    openAddressModal(){
      this.userAction = 0;// 用户类型改为新增
      this.checkedItem = {};// 仅打开模态框，并没有对象
      this.showEditModal = true;
    },
    // 编辑新增地址弹框
    editAddressModal(item){
      this.userAction = 1;
      this.checkedItem = item;
      this.showEditModal = true;
      },
    // 删除收货地址
      delAddress(item) {
        // 由于添加和修改时都需要这个checkedItem，因此data那里就不单独定义item.id
      this.checkedItem = item;
      this.userAction = 2;//表示当前是删除
      this.showDelModal = true;
    },
    // 提交一个新的地址，包括地址删除、编辑、新增功能
      submitAddress() {
    // let item=thie.checkedItem,action
      let {checkedItem,userAction} = this;
      let method, url, params = {};
    //   不同功能下需要的方法不一样
      if(userAction == 0){
          method = 'post', url = '/#/shippings';
          /* params = {
              receiverName: this.checkedItem.receiverName,
              receiverMobile: this.checkedItem.receiverMobile,
              receiverProvince: this.checkedItem.receiverProvince,
              receiverCity: this.checkedItem.receiverCity,
              receiverDistrict: this.checkedItem.receiverDistrict,
              receiverAddress: this.checkedItem.receiverAddress,
              receiverZip: this.checkedItem.receiverZip
        } */
      }else if(userAction == 1){
        method = 'put',url = `/#/shippings/${checkedItem.id}`;
      }else {
        method = 'delete',url = `/#/shippings/${checkedItem.id}`;
      }
      // 优化：新增或编辑时都需要获取item，就在这里总定义
          if (userAction == 0 || userAction == 1) {
        // 先都解构出来，方便做代码校验
        let { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem;
        // 每次执行完，下一次在调用函数时先置为空
        let errMsg = '';
        // 错误判断--按顺序从前往后依次识别是否为空，并报错
        if(!receiverName){
          errMsg = '请输入收货人名称';
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
        //通过test验证手机号是不是11位的数字
          errMsg = '请输入正确格式的手机号';
        }else if(!receiverProvince){
          errMsg = '请选择省份';
        }else if(!receiverCity){
          errMsg = '请选择对应的城市';
        }else if(!receiverAddress || !receiverDistrict){
          errMsg = '请输入详细收货地址';
        }else if(!/\d{6}/.test(receiverZip)){
          errMsg = '请输入六位邮编';
        }
        if(errMsg){
          this.$message.error(errMsg);
          return;
        }
        // key和value值一样，就省略了
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
    //   提交之后：
      // 不管post,put,delete都动态获取方法进行调用
      // 类似this.axios.get(...)
      this.axios[method](url,params).then(()=>{
        this.closeModal();//通用方法抽取到了下面，用来关闭弹窗
        this.getAddressList();//地址设为空
        this.$message.success('操作成功!');
      });
    },
    closeModal(){
      this.checkedItem = {};//已选中商品为0
      this.userAction = '';//用户行为设为空
      this.showDelModal = false;
      this.showEditModal = false;
    },
    getCartList(){
      this.axios.get('/#/cart').then((res)=>{
        let list = res.cartProductVoList;//获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice;//从后台获取-已经选中的商品总金额
        // 过滤所有已选中商品的list，productSelected是true/false
          this.cartList = list.filter(item => item.productSelected);
        // 将所有已选中商品的数量累加，作为要结算的总商品数
        this.cartList.map((item)=>{
          this.count += item.quantity;
        })
      })
    },
    // 订单提交
      orderSubmit() {
        // 选择地址列表中当前选中的地址索引
      let item = this.list[this.checkIndex];
      if(!item){
        this.$message.error('请选择一个收货地址');
        return;
      }
      this.axios.post('/#/order',{
        shippingId:item.id
      }).then((res)=>{
        this.$router.push({
          path:'/order/pay',
            query: {
            // 订单号
            orderNo:res.orderNo
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  .order-confirm{
    .wrapper{
      background-color:$colorJ;
      padding-top:30px;
      padding-bottom:84px;
      // 安全区内的所有，包括地址栏和商品栏
      .order-box{
        background-color:$colorG;
        padding-left: 40px;
        padding-bottom: 40px;
        .addr-title{
          font-size: 20px;
          color: #333;
          font-weight: 200;
          margin-bottom:21px;
        }
        .item-address{
          padding-top: 38px;
          .addr-list{
            .addr-info,.addr-add{
              box-sizing:border-box;
              float: left;
              width:271px;
              height:180px;
              border:1px solid $colorH;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color:#757575;
            }
            .addr-info{
              cursor:pointer;
              h2{
                height:27px;
                font-size:18px;
                font-weight: 300;
                color:#333;
                margin-bottom:10px;
              }
              .street{
                height:50px;
              }
              .action{
                height:50px;
                line-height:50px;
                .icon{
                  width: 20px;
                  height: 20px;
                  fill: #666;
                  vertical-align: middle;
                  &:hover{
                    fill: $colorA;
                  }
                }
              }
              &.checked{
                border:1px solid $colorA;
              }
            }
            .addr-add{
              text-align:center;
              color: #999;
              cursor:pointer;
              .icon-add{
                width:30px;
                height:30px;
                border-radius:50%;
                background:url('../../public/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size:14px;
                margin: 0 auto;
                margin-top: 45px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .item-good{
          margin-top:34px;
          border-bottom: 1px solid $colorH;
          padding-bottom: 12px;
          h2{
            border-bottom:1px solid $colorH;
            padding-bottom: 5px;
          }
          li{
            display:flex;
            align-items: center;
            height:40px;
            line-height:40px;
            margin-top:10px;
            font-size:16px;
            color:#333;
            .good-name{
              flex:5;
              img{
                width:30px;
                height:30px;
                vertical-align:middle;
              }
            }
            .good-price{
              flex:2;
            }
            .good-total{
              padding-right:44px;
              color:$colorA;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top:31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            font-size:16px;
            color:$colorA;
            margin-right:23px;
          }
        }
        .detail{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid $colorJ;
          text-align: right;
          font-size: 16px;
          color: $colorC;
          .item-val{
            color:$colorA;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:100px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          margin-top: 37px;
          text-align: right;
        }
      }
    }
    // model弹框--新增地址
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px; 
        .input{
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid $colorH;
          // 给当前input的第二个兄弟元素添加左外边距
          &+.input{
            margin-left:14px;
          }
        }
        // 省市区
        select{
          height:40px;
          line-height:40px;
          border:1px solid $colorH;
          margin-right:15px;
        }
        // 详细地址
        textarea{
          height:62px;
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid $colorH;
        }
      }
    }
  }
</style>