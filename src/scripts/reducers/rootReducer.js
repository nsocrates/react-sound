import entities from './entities'
import errorMessage from './errorMessage'
import isVisible from './sideMenu'
import partition from './partition'
import requested from './requested'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  errorMessage,
  isVisible,
  partition,
  requested
})

export default rootReducer
