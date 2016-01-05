import * as ActionTypes from '../constants/ActionTypes'
import { combineReducers } from 'redux'
import union from 'lodash/array/union'
import merge from 'lodash/object/merge'

// Creates a reducer managing partition, given the action types to handle,
// and a function telling how to extract the key from an action.
const initialState = {
	ids: [],
	isFetching: false
	// next_href: undefined
}

function partitionate({ types, mapActionToKey }) {
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected types to be an array of three elements.')
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected types to be strings.')
	}
	if (typeof mapActionToKey !== 'function') {
		throw new Error('Expected mapActionToKey to be a function.')
	}

	const [ requestType, successType, failureType ] = types

	function updatePartition(state = initialState, action) {
		switch (action.type) {
			case requestType:
				return merge({}, state, {
					isFetching: true
				})
			case successType:
				return merge({}, state, {
					isFetching: false,
					ids: union(state.ids, action.response.result)
					// next_href: action.response.next_href
				})
			case failureType:
				return merge({}, state, {
					isFetching: false
				})
			default:
				return state
		}
	}

	return function updatePartitionByKey(state = {}, action) {
		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action)
				if (typeof key !== 'string') {
					throw new Error('Expected key to be a string.')
				}
				return merge({}, state, {
					[key]: updatePartition(state[key], action)
				})
			default:
				return state
		}
	}
}

// Updates partition data for different actions:
const partition = combineReducers({
	playlistByUser: partitionate({
		mapActionToKey: action => action.id,
		types: [
			ActionTypes.PLAYLIST_REQUEST,
			ActionTypes.PLAYLIST_SUCCESS,
			ActionTypes.PLAYLIST_FAILURE
		]
	}),
	tracksByGenre: partitionate({
		mapActionToKey: action => action.genre,
		types: [
			ActionTypes.GENRE_REQUEST,
			ActionTypes.GENRE_SUCCESS,
			ActionTypes.GENRE_FAILURE
		]
	})
})

export default partition
