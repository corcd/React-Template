/*
 * @Author: Whzcorcd
 * @Date: 2020-06-18 15:02:51
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-18 15:46:55
 * @Description: file content
 */
const isDev = process.env.NODE_ENV === 'development'

export function getUrl() {
  const baseUrl = '//consoles.guangdianyun.tv'

  return isDev ? `http://localhost:9090` : baseUrl
}
