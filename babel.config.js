module.exports = {
    // 环境预设的解码规则
    "presets": [
    // 官方推荐方式
    // preset插件也包括了一系列插件
    // preset是一系列插件的组合，包括ES2015-2018
    "@vue/cli-plugin-babel/preset"
    ],
    // 辅助性插件
    "plugins": [
        [
        // 按需加载-cnpm run build之后的js包更小，体现了按需加载
        // 只加载了elementui中的message而非全部
      "component",
      {
        // 指定ui框架名称
        "libraryName": "element-ui",
        // css组件名称
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
