import api from 'middleware/api'
import auth from 'middleware/auth'
import createLogger from 'redux-logger'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

const reducer = combineReducers({
  app: rootReducer,
  router: routerReducer
})

const logger = createLogger()

export default function makeStore(initialState, history) {
  const reduxRouter = routerMiddleware(history)
  const createStoreWithMiddleware = applyMiddleware(
    api,
    auth,
    thunk,
    logger,
    reduxRouter
  )(createStore)
  const store = createStoreWithMiddleware(reducer, initialState)

  return store
}
