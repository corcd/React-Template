/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 12:30:45
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 12:32:08
 * @Description: file content
 */
import { USERINFO, CLEARUSERINFO } from '@/constants/user'

const INITIAL_STATE = {
  userInfo: null,
  businessInfo: null,
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERINFO:
      return {
        ...state,
        userInfo: action.payload.data,
      }
    case CLEARUSERINFO:
      return {
        ...state,
        userInfo: {},
      }
    default:
      return state
  }
}
