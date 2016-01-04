import entities from './entities'
import errorMessage from './errorMessage'
import partition from './partition'
import requested from './requested'
import sideMenu from './sideMenu'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	entities,
	errorMessage,
	partition,
	requested,
	sideMenu
})

export default rootReducer
