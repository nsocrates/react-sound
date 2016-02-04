import * as ActionTypes from 'constants/ActionTypes'

export default function requested(state = null, action) {
  switch (action.type) {
    case ActionTypes.GENRE_REQUEST:
    case ActionTypes.GENRE_CACHED:
      return action.genre
    case ActionTypes.PLAYLIST_REQUEST:
      return action.id
    case ActionTypes.TRACK_REQUEST:
      return action.id
    case ActionTypes.USER_REQUEST:
      return action.id
    case ActionTypes.SEARCH_REQUEST:
    case ActionTypes.SEARCH_CACHED:
      return action.input
    default:
      return state
  }
}
