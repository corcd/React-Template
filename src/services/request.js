/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 12:35:08
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 12:55:56
 * @Description: file content
 */
/* eslint-disable */
import store from '@/store'
import axios from 'axios'
import Qs from 'qs'

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

/**
 * 用来判断值类型
 * @param {Object} obj
 */
const toType = (obj) => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

/**
 * 对象 null 值过滤
 * @param {Object} obj 请求 data 对象
 */
const filterNull = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    } else {
      if (toType(obj[key]) === 'string') {
        obj[key] = obj[key].trim()
      } else if (toType(obj[key]) === 'object') {
        obj[key] = filterNull(obj[key])
      } else if (toType(obj[key]) === 'array') {
        obj[key] = filterNull(obj[key])
      }
    }
  }
  return obj
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} info 请求失败的附带信息
 */
const errorHandle = (status, info) => {
  // 状态码判断
  switch (status) {
    // 400: 客户端请求错误
    case 400:
      // Message.error('请求错误，请检查您的网络')
      break
    case 401:
      // errorInfo = '401：访问令牌无效或已过期'
      break
    case 403:
      // errorInfo = '403：拒绝访问'
      break
    case 404:
      // Message.error('请求的资源不存在')
      break
    case 405:
      // errorInfo = '405：请求方法未允许'
      break
    case 408:
      // errorInfo = '408：请求超时'
      break
    case 450:
      // Message.error('请求参数错误')
      break
    case 500:
      // Message.error('服务异常，请稍后再试')
      break
    case 501:
      // errorInfo = '501：服务未实现';
      break
    case 502:
      // errorInfo = '502：无效的网关';
      break
    case 503:
      // Message.error('服务不可用，请稍后再试')
      break
    default:
    // Message.error({
    //   message: info,
    //   center: true,
    // })
  }
}

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
    } else if (config.method === 'post') {
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
