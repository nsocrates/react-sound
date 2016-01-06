import api from 'middleware/api'
import createLogger from 'redux-logger'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { createHistory } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routeReducer, syncReduxAndRouter } from 'redux-simple-router'

const reducer = combineReducers({
  app: rootReducer,
  routing: routeReducer
})

const history = createHistory()
const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  api,
  thunk,
  logger
)(createStore)

const store = createStoreWithMiddleware(reducer)

syncReduxAndRouter(history, store)

export default function makeStore() {
  return createStoreWithMiddleware(reducer)
}
