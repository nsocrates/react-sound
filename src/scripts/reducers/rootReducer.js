import authCollection from './authCollection'
import authUser from './authUser'
import entities from './entities'
import notifications from './notifications'
import pagination from './pagination'
import partition from './partition'
import player from './player'
import stream from './stream'
import toggles from './toggles'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  pagination,
  partition,
  auth: combineReducers({
    collection: authCollection,
    user: authUser
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
