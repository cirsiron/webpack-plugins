## add-loading-webpack-plugin
- 此webpack插件是用于单页应用中 js或css加载时间较长时使用
- 在视觉上提高用户的体验，会将loading效果直接注入生成的index.html中
- 注入代码内容较少，只会有一个loading效果
- 如果autoRemove设置为true，那么loading效果会在load事件完成后移除
```js
// webpack.config.js
const AddLoadingPlugin = require('add-loading-webpack-plugin')

module.exports = {
  // ...xxx
  plugins: [
    new AddLoadingPlugin({
      id: 'loading' // 默认为loading 插入元素的id名
      autoRemove: false // 默认为true 是否自动移除loading,需要手动
    })
  ]
}
// main.js 入口js文件
// 如果autoRemove设置为 false ,需要手动移除
window.removeLoading && window.removeLoading()
``` 