import entities from './entities'
import errorMessage from './errorMessage'
import partition from './partition'
import player from './player'
import ui from './ui'
import stream from './stream'
import { combineReducers } from 'redux'
import comments from './comments'

const rootReducer = combineReducers({
  comments,
  entities,
  errorMessage,
  partition,
  ui,
  media: combineReducers({
    player,
    stream
  })
})

export default rootReducer
