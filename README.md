## add-loading-webpack-plugin

- 一款在视觉上可以大幅度减少白屏时间的webpack插件，通过提前注入loading效果减少白屏时间

- 1.此webpack插件是适合用于单页应用中js或css加载时间较长时或网络速度较慢时使用
- 2.在视觉上提高用户的体验，会将loading效果直接注入生成的index.html中

### 效果图
![loading.gif](https://s3.ax1x.com/2020/11/25/DUgrjI.gif)

### 优点
- 便捷
  - 通过插件配置直接引入
- 速度快
  - 因为注入的内容非常少，对于打包后的体积和性能几乎不影响
- 配置方便
  - 支持移除时机，DOM加载完毕或自定义移除时机

### 使用
```js
// webpack.config.js
const AddLoadingPlugin = require('@weiyi/add-loading-webpack-plugin')

module.exports = {
  // ...xxx
  plugins: [
    new AddLoadingPlugin({
      id: 'loading', // 【可选】默认为loading 插入元素的id名
      autoRemove: false //【可选】 默认为true 是否自动移除loading,需要手动
    })
  ]
}
// main.js 入口js文件
// 如果autoRemove设置为 false ,需要手动移除
window.removeLoading && window.removeLoading()
``` 

