import auth from './auth'
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
  auth,
  entities,
  errorMessage,
  pagination,
  partition,
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
