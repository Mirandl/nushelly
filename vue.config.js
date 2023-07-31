// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer:{
    host:'localhost',
    port: 8080,
    // 代理是更为简单安全的方式
    proxy:{
        '/api': {
        //  代理跨域的如果任务请求不同，直接改这里
        // target:'https://mall-pre.springboot.cn',
        target:'http://localhost:8080',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  //你好
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,--关闭eslint语法校验，但建议开启
  productionSourceMap:true,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch');
  }
}
