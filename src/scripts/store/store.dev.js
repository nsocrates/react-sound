import api from 'middleware/api'
import createLogger from 'redux-logger'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routeReducer, syncHistory } from 'react-router-redux'

const logger = createLogger()

const reducer = combineReducers({
  app: rootReducer,
  router: routeReducer
})

const reduxRouter = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
  api,
  thunk,
  logger,
  reduxRouter
)(createStore)

const store = createStoreWithMiddleware(reducer)

reduxRouter.listenForReplays(store, state => state.router.location)

export default function makeStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
