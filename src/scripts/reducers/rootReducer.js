import authResult from './authResult'
import authCollection from './authCollection'
import entities from './entities'
import errorMessage from './errorMessage'
import notifications from './notifications'
import pagination from './pagination'
import partition from './partition'
import player from './player'
import stream from './stream'
import toggles from './toggles'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  errorMessage,
  pagination,
  partition,
  auth: combineReducers({
    result: authResult,
    collection: authCollection
  }),
  ui: combineReducers({
    notifications,
    toggles
  }),
  media: combineReducers({
    player,
    stream
  })
})

export default rootReducer
