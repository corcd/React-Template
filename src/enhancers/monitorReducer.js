/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 17:14:49
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 17:17:06
 * @Description: file content
 */
const round = (number) => Math.round(number * 100) / 100

const monitorReducerEnhancer = (createStore) => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = round(end - start)

    console.log('reducer process time:', diff)

    return newState
  }

  return createStore(monitoredReducer, initialState, enhancer)
}

export default monitorReducerEnhancer
