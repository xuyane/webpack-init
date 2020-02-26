//webpack 是node 写出来的  node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer: { //开发服务器的配置
    port: 8000,
    progress: true,
    contentBase: './build',
    compress: true
  },
  mode: 'production',//模式 默认两种 production development
  entry: './src/index.js', //入口
  output: {
    filename: 'bundle.[hash:8].js',//打包后的文件名
    path: path.resolve(__dirname, 'build'),//必须是一个绝对路径
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, //删除模板中的双引号
        collapseWhitespace: true, //折叠空行
      },
      hash: true
    })
  ],
  module: { //模块
    rules: [ //规则 css-loader 持续 @import 这种语法的
      // style-loader 他是把css插入到head的标签中
      // loader的特点 希望单一
      //loader 的用法 字符串只用 一个loader
      //多个loader需求[]
      //loader的顺序 默认是从右向左执行 从下至上
      //loader还可以写成 对象方式
      {
        //可以处理less文件
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            insert: 'top'//插在最上面，让自己写在模版html<style>标签中的样式优先级较高
          }
        }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'top'//插在最上面，让自己写在模版html<style>标签中的样式优先级较高
            }
          },
          'css-loader', //解析@import 解析路径
          'less-loader' //把less->css
        ]
      }
    ]
  }
}