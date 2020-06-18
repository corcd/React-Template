/*
 * @Author: Whzcorcd
 * @Date: 2020-06-18 15:11:17
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-18 15:36:46
 * @Description: file content
 */
/**
 * 用来判断值类型
 * @param {Object} obj
 */
export const toType = (obj) => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

/**
 * 对象 null 值过滤
 * @param {Object} obj 请求 data 对象
 */
export const filterNull = (obj) => {
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
export const errorHandle = (status, info) => {
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
      break
  }
}
