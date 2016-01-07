import api from 'middleware/api'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { createHistory } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routeReducer, syncReduxAndRouter } from 'redux-simple-router'

const history = createHistory()

const reducer = combineReducers({
  app: rootReducer,
  router: routeReducer
})

const createStoreWithMiddleware = applyMiddleware(
  api,
  thunk
)(createStore)

const store = createStoreWithMiddleware(reducer)

syncReduxAndRouter(history, store, state => state.router)

export default function makeStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
