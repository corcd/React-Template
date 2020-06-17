/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 17:13:56
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 17:14:19
 * @Description: file content
 */
const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.info('dispatching', action)

  const result = next(action)

  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default logger
