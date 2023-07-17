<template>
  <div class="cart">
    <order-header title="我的购物车">
        <!-- 指定采用名称为tip的插槽 -->
      <template v-slot:tip>
        <!-- 父组件指定插槽的内容，这里是插入一个span，具体插入位置由子组件orderheader决定-->
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
              <div class="item-check">
              <!-- 只有当前商品被选中时checked类才生效，如果点击勾选框，一个是变色，一个是更新购物车数量 -->
                <span class="checkbox" v-bind:class="{'checked':item.productSelected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
              <!-- 改成真实图片地址‘  ’ -->
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <!-- 要添加该商品的数量 -->
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <!-- 当前商品的小计价格=单价×件数，这个由后台计算，前端不能直接写，以保证安全性 -->
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
          <!-- 为保证安全性，这个也是后台计算的 -->
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <!-- 模态框-弹窗 -->
    <modal 
      title="确认信息" 
      sureText="请确认要删除当前商品" 
      btnType="3" 
      modalType="middle" 
      v-bind:showModal="showModal"
      v-on:submit="delProduct"
      v-on:cancel="showModal=false"
      >
      <!-- submit是自定义事件，确定事件就执行删除方法，取消事件就隐藏弹窗 -->
      <!-- 用模板定义弹框组件，用插槽来定义弹窗名称-body -->
      <template v-slot:body>
        <p>商品删除成功！</p>
      </template>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import ServiceBar from './../components/ServiceBar' 
  import NavFooter from './../components/NavFooter'
  import Modal from './../components/Modal'
  export default{
    name:'index',
    components:{
      OrderHeader,
      ServiceBar,
      NavFooter,
      Modal
    },
    data(){
      return {
        list:[],//商品列表
        allChecked:false,//是否全选
        cartTotalPrice:0,//商品总金额
        checkedNum: 0,//选中商品数量
        // 默认不显示弹框，只有在点击时才显示
        showModal:false
      }
    },
    mounted(){
      this.getCartList();
    },
    methods:{
      // 获取购物车列表
      getCartList(){
        this.axios.get('/cart').then((res)=>{
          this.renderData(res);
        })
      },
      // 更新购物车数量和购物车单选状态
        updateCart(item, type) {
        // 获取商品数量和选中状态
        let quantity = item.quantity,
            selected = item.productSelected;
        if(type == '-'){
            if (quantity == 1) {
            // 如果商品数量当前是1，就不能继续减了
            this.$message.warning('商品至少保留一件');
            return;
            }
        //   当前语句下就要做一次减法，如果减号放后面就是下一轮再减
            --quantity;
        } else if (type == '+') {
            // 防止商品数量超过库存
          if(quantity > item.productStock){
            this.$message.warning('购买数量不能超过库存数量');
            return;
          }
          ++quantity;
        } else {
            // 选中状态和非选中状态取反
          selected = !item.productSelected;
        }
        // 更新购物车中 产品数量
        this.axios.put(`/cart/${item.productId}`,{
          quantity,
          selected
        }).then((res)=>{
          this.renderData(res);
        })
      },
      // 删除购物车商品
      delProduct(item){
          this.axios.delete(`/cart/${item.productId}`).then((res) => {
        // 点击删除后，显示弹框，确认信息，确认后才能删除
          this.showModal = true;
          this.$message.success('删除成功');
          this.renderData(res);
        });
      },
      // 控制全选功能
        toggleAll() {
        // 全选变非全选
        let url = this.allChecked?'/cart/unSelectAll':'/cart/selectAll';
            this.axios.put(url).then((res) => {
            // 获取购物车列表
          this.renderData(res);
        })
      },
      // 公共赋值--都放在一个方法中
      renderData(res){
        this.list = res.cartProductVoList || [];//成功读取到购物车列表
        // 如何判断当前商品有没有全部选中？？？？
        this.allChecked = res.selectedAll;// 控制全选--改变全选框的选中状态
        this.cartTotalPrice = res.cartTotalPrice;// 购物车总金额
        // 当item后面要返回的超过一句话时,要加{return  }
        this.checkedNum = this.list.filter(item=>item.productSelected).length;//选中了购物车的数量，通过每个商品是否被选中来过滤
      },
      // 购物车下单
        order() { 
        // every(必须全部满足条件)只要有一个是false（选中），便返回false.如果没有商品被选中，ischeck就返回true
        let isCheck = this.list.every(item=>!item.productSelected);
        if(isCheck){
          this.$message.warning('请选择一件商品');
        } else {
            // 如果有选中的购物车，就可以跳转去结算
          this.$router.push('/order/confirm');
        }
      }
    }
  }
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('../../public/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('../../public/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>