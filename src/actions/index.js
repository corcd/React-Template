/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 12:25:15
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 12:32:26
 * @Description: file content
 */
import { bindActionCreators } from 'redux'
import { USERINFO, CLEARUSERINFO } from '@/constants/user'
import store from '@/store'

// 设置登录态和个人信息
export function userInfo(data) {
  return { type: USERINFO, payload: data }
}

// 清除登录态和个人信息
export function clearUserInfo() {
  return { type: CLEARUSERINFO, payload: {} }
}

// 获取商务经理信息

export default bindActionCreators(
  {
    userInfo,
  },
  store.dispatch
)
