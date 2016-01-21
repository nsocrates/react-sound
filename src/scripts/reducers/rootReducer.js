import entities from './entities'
import errorMessage from './errorMessage'
import partition from './partition'
import player from './player'
import requested from './requested'
import sideMenu from './sideMenu'
import stream from './stream'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  errorMessage,
  partition,
  requested,
  sideMenu,
  media: combineReducers({
    player,
    stream
  })
})

export default rootReducer
