/*
 * @Author: Whzcorcd
 * @Date: 2020-06-17 12:25:10
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-17 17:51:45
 * @Description: file content
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '@/reducers'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'

import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}

const middlewareEnhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
)

const enhancers = [middlewareEnhancer, monitorReducersEnhancer]

const composeEnhancers = composeWithDevTools(...enhancers)

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, composeEnhancers)

  // 热加载
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
