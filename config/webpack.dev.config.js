/*
 * @Author: Whzcorcd
 * @Date: 2020-06-12 14:22:01
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-18 16:52:59
 * @Description: file content
 */
'use strict'

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 9000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      // 代理
      '/api': {
        target:
          'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React template',
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
