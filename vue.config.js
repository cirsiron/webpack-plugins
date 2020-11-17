const AddLoading = require('./plugins/addLoading-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new AddLoading()
    ]
  }
}
