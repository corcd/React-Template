/*
 * @Author: Whzcorcd
 * @Date: 2020-06-12 14:31:01
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 17:13:07
 * @Description: file content
 */

import React from 'react'
import ReactDom from 'react-dom'
import Router from './routers'
import configStore from './store'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import dayjs from 'dayjs'
import zhCN from 'antd/es/locale/zh_CN'

import 'dayjs/locale/zh-cn'

import './styles/main.less'

dayjs.locale('zh-cn')

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </Provider>
)

ReactDom.render(<App />, document.getElementById('root'))

// 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('module.hot, ', err)
    }
  })
}
