import * as ActionTypes from 'constants/ActionTypes'

// Updates selected request
export default function requested(state = 'Trance', action) {
  switch (action.type) {
    case ActionTypes.GENRE_REQUEST:
      return action.genre
    case ActionTypes.PLAYLIST_REQUEST:
      return action.id
    case ActionTypes.TRACK_REQUEST:
      return action.id
    case ActionTypes.USER_REQUEST:
      return action.id
    case ActionTypes.GENRE_CACHED:
      return action.genre
    case ActionTypes.SEARCH_REQUEST:
      return action.input
    default:
      return state
  }
}
