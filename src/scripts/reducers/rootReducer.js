import entities from './entities'
import errorMessage from './errorMessage'
import pagination from './pagination'
import partition from './partition'
import player from './player'
import stream from './stream'
import ui from './ui'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  entities,
  errorMessage,
  pagination,
  partition,
  ui,
  media: combineReducers({
    player,
    stream
  })
})

export default rootReducer
