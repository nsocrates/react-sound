import * as authPartition from './authPartition'
import * as authCollection from './authCollection'
import authUser from './authUser'
import browser from './browser'
import entities from './entities'
import notifications from './notifications'
import pagination from './pagination'
import partition from './partition'
import player from './player'
import stream from './stream'
import toggles from './toggles'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  browser,
  entities,
  pagination,
  partition,
  auth: combineReducers({
    stream: authPartition.stream,
    playlists: authPartition.playlists,
    likes: authCollection.likes,
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
