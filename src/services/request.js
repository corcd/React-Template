/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 12:35:08
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-18 15:48:56
 * @Description: file content
 */
/* eslint-disable */
import store from '@/store'
import axios from 'axios'
import Qs from 'qs'

import { filterNull, errorHandle } from './toolkit'

// 创建 axios 实例
const Request = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  timeout: 3000,
  transformRequest: [
    (data) => {
      return data
    },
  ],
  transformResponse: [
    (data) => {
      return data
    },
  ],
})

// 请求拦截器
Request.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (!config.url.includes('lcps.aodianyun.com')) {
      const token = store.state.lcpsData.token
      config.headers.token = token
      config.headers['X-Ca-Stage'] = String(process.env.APP_X_CA_STAGE)
    }

    if (config.method === 'get') {
      const data = filterNull(config.data)
      config.params = data
    } else if (config.method === 'post' || config.method === 'delete') {
      const contentType = config.headers['Content-Type']
      if (contentType.includes('multipart')) {
        // 类型 'multipart/form-data'
        // config.data = data;
      } else if (contentType.includes('json')) {
        // 类型 'application/json'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data)
      } else {
        // 类型 'application/x-www-form-urlencoded'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = Qs.stringify(config.data)
      }
    }
    return config
  },
  (error) => {
    // Message.error({
    //   message: '请求失败',
    //   center: true,
    // })
    return Promise.error(error)
  }
)

// 响应拦截器
Request.interceptors.response.use(
  (response) => {
    // console.log(response)
    // store.commit('changeNetwork', true)
    if (response.status === 200) {
      if (response.config.url.includes('lcps.aodianyun.com')) {
        if (Number(response.data.code) === 0) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(response.data.message)
        }
      } else {
        if (
          Number(response.data.code) === 200 &&
          Number(response.data.errorCode) === 0
        ) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(response.data.errorMessage)
        }
      }
    } else {
      // 请求已发出，在 2xx 的范围
      // Message.error({
      //   message: '请求响应错误',
      //   center: true,
      // })
      return Promise.reject(response)
    }
  },
  (error) => {
    const { err } = error
    if (err) {
      // 请求已发出，但是不在 2xx 的范围
      // Message.error({
      //   message: '请求响应异常',
      //   center: true,
      // })
      errorHandle(err.status, err.data.errorMessage)
      return Promise.reject(err)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新 state 的 network 状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // Message.error({
        //   message: '网络断开',
        //   center: true,
        // })
        // store.commit('changeNetwork', false)
      } else {
        // Message.error({
        //   message: '响应超时',
        //   center: true,
        // })
        return Promise.reject(error)
      }
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return { AxiosInstance }
 */
export default Request
