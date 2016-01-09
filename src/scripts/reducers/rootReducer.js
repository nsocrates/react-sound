import entities from './entities'
import errorMessage from './errorMessage'
import sideMenu from './sideMenu'
import partition from './partition'
import requested from './requested'
import stream from './stream'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  errorMessage,
  partition,
  requested,
  sideMenu,
  stream
})

export default rootReducer
