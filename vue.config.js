// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
    devServer: {
    //   开发服务器的相关配置信息
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
// vue内部包含隐藏的webpack插件作为中间件，通过webpack和nodejs结合之后搭建了一套本地的开发服务器devServer
// 项目的打包，压缩合并，混淆，哈希串的生成，sourcemap等都是在这个文件里进行配置
// publicPath:'/',
// outputDir:'dist',
// indexPath:'index2.html',
// lintOnSave:false,--关闭eslint语法校验，但建议开启
    
    // 本地设为true方便调试，打包上线要设为false！
    productionSourceMap: true,

    // 通过调用回调函数，传递config参数
    chainWebpack: (config) => {
    // 删除预加载的
    config.plugins.delete('prefetch');
  }
}
