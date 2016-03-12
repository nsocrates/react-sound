import api from 'middleware/api'
import auth from 'middleware/auth'
import createLogger from 'redux-logger'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const reducer = combineReducers({
  app: rootReducer,
  router: routerReducer
})

const logger = createLogger()
const reduxRouter = routerMiddleware(browserHistory)

const createStoreWithMiddleware = applyMiddleware(
  api,
  auth,
  thunk,
  logger,
  reduxRouter
)(createStore)

export default function makeStore() {
  const store = createStoreWithMiddleware(reducer)

  return store
}
