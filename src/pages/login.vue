<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="../../public/imgs/guo-login.png" alt="">
    </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
           <input class="padd" type="checkbox">&nbsp;同意协议并注册<a href="#">《知晓用户协议》</a>
          <div class="btn-box">
            <!-- v-on:click 绑定点击事件-->
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
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
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:'',
      userId:''
    }
    },
//   提交用户信息之后应该会产生一个token供在服务端和浏览器端通信，这里使用id来辨识身份
    methods: {
    // 登录
    login(){
      let { username,password } = this;// 把this解构
      if(!username || !password){
        this.$message.error('请输入您的用户名和密码');
        return;
      }
      this.axios.post('/user/login',{
        username,//当key和value名称一样时，就可以简写username:username
        password
      }).then((res) => {
        // 登录，保存用户名
        // expires设置cookie过期时间，session表示关闭对话框就过期了，也可以设置1M一个月过期
        // this.$cookie.set('userId',res.id,{expires:'Session'});
        this.$cookie.set('userId',res.id,{expires:'1M'});
        // 存储username--与下面的mapaction等同
        // this.$store.dispatch('saveUserName',res.username);
        // 保存用户名，注册信息--与下面的mapaction等同
        // this.saveUserName(res.username);
        // 点击登录之后跳转到首页
        this.$router.push('/#/index');
        /*this.$router.push({
          name:'index',
          params:{
            from:'login'
          }
        });*/
        // 由于main.js已经有捕获异常的代码，这里就不写catch了
      })
    },
    // 当变量多了之后可以用map数组辅助变量自动传参
        ...mapActions(['saveUserName']),
    // 注册
    register(){
      /* this.$message.success('功能暂未开发');
      return; */
      // 表单提交使用post请求
      this.axios.post('/user/register',{
        username:'admin1',
        password:'admin1',
        email:'admin1@163.com'
      }).then(() => {
        // elementUI指令
        this.$message.success('注册成功');
      })
      this.$router.push('register');
    }
  }
}
</script>
<style lang="scss">
.login{
  &>.container{
    height:113px;
    img{
      margin-top: 20px;
      width:200px;
      height: auto;
    }
  }
  .wrapper{
    // background:url('../../public/imgs/login-bg.jpg') no-repeat center;
    background:url('https://b.appsimg.com/upload/momin/2020/12/14/15/1607915393371.jpg') no-repeat center;
    .container{
      height:576px;
      .login-form{
        // 将padding限制在box内容内，不能超出
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          width:100%;
          line-height:50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:12px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
      margin-bottom: 10px;
    }
  }
}
</style>