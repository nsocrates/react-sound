import * as ActionTypes from '../constants/ActionTypes'
import { CALL_API } from '../constants/Api'
import { Schemas } from '../constants/Schemas'

// Fetches a collection of tracks for a particular playlist:
function fetchPlaylist(id, next_href) {
	return {
		id,
		[CALL_API]: {
			types: [
				ActionTypes.PLAYLIST_REQUEST,
				ActionTypes.PLAYLIST_SUCCESS,
				ActionTypes.PLAYLIST_FAILURE
			],
			endpoint: next_href,
			schema: Schemas.PLAYLIST
		}
	}
}

export function loadPlaylist(id) {
	return (dispatch, getState) => {
		const {
			next_href = `/playlists/${id}?`
		} = getState().app.partition.playlistByUser[id] || {}

		return dispatch(fetchPlaylist(id, next_href))
	}
}
