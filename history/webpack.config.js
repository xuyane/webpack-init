//webpack 是node 写出来的  node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer:{ //开发服务器的配置
    port:8000,
    progress:true,
    contentBase:'./build',
    compress:true
  },
  mode:'production',//模式 默认两种 production development
  entry:'./src/index.js', //入口
  output:{
    filename:'bundle.[hash:8].js' ,//打包后的文件名
    path:path.resolve(__dirname,'build'),//必须是一个绝对路径
  },
  plugins:[ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template : './src/index.html',
      filename :'index.html',
      minify:{
        removeAttributeQuotes:true, //删除模板中的双引号
        collapseWhitespace:true, //折叠空行
      },
      hash:true
    })
  ]
}