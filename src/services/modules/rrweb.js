/*
 * @Author: Whzcorcd
 * @Date: 2020-06-18 15:27:36
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-18 16:38:34
 * @Description: file content
 */
import Request from '../request'
import getUrl from '../getUrl'

const rrweb = {
  query(data) {
    return Request({
      method: 'get',
      url: `${getUrl()}/rrweb/query`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      params: data,
    })
  },
  getData(data) {
    return Request({
      method: 'get',
      url: `${getUrl()}/rrweb/data`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      params: data,
    })
  },
  delData(data) {
    return Request({
      method: 'delete',
      url: `${getUrl()}/rrweb/del`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: data,
    })
  },
  //...
}

export default rrweb
