import api from 'middleware/api'
import auth from 'middleware/auth'
import rootReducer from 'reducers/rootReducer'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

const reducer = combineReducers({
  app: rootReducer,
  router: routerReducer
})

export default function makeStore(initialState, history) {
  const reduxRouter = routerMiddleware(history)
  const createStoreWithMiddleware = applyMiddleware(
    api,
    auth,
    thunk,
    reduxRouter
  )(createStore)
  const store = createStoreWithMiddleware(reducer, initialState)

  return store
}
