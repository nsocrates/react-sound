import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  type: null,
  query: null,
  isFetching: false,
  hasMore: false,
  hasCache: false
}

export default function requested(state = initialState, action) {
  const { id, genre, input } = action

  switch (action.type) {
    case ActionTypes.GENRE_REQUEST:
    case ActionTypes.GENRE_CACHED:
      return Object.assign({}, state, {
        type: action.type.split('_')[0],
        query: genre,
        isFetching: ActionTypes.GENRE_REQUEST === action.type,
        hasMore: !!action.next_href
      })
    case ActionTypes.PLAYLIST_REQUEST:
    case ActionTypes.TRACK_REQUEST:
    case ActionTypes.USER_REQUEST:
      return Object.assign({}, state, {
        type: action.type.split('_')[0],
        query: id,
        isFetching: true
      })
    case ActionTypes.USER_CACHED:
      return Object.assign({}, state, {
        type: action.type.split('_')[0],
        query: id,
        hasMore: !!action.next_href
      })
    case ActionTypes.SEARCH_REQUEST:
    case ActionTypes.SEARCH_CACHED:
      return Object.assign({}, state, {
        type: action.type.split('_')[0],
        query: input,
        isFetching: ActionTypes.SEARCH_REQUEST === action.type,
        hasMore: !!action.next_href
      })
    case ActionTypes.GENRE_SUCCESS:
    case ActionTypes.PLAYLIST_SUCCESS:
    case ActionTypes.TRACK_SUCCESS:
    case ActionTypes.USER_SUCCESS:
    case ActionTypes.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasCache: true,
        hasMore: !!action.response.next_href
      })
    default:
      return state
  }
}
