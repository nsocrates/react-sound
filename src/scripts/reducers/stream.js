import * as ActionTypes from 'constants/ActionTypes'

const initialState = {
  canPlay: null,
  trackId: null,
  error: null
}

export default function stream(state = initialState, action) {
  const { trackId, error } = action

  switch (action.type) {
    case ActionTypes.STREAM_REQUEST:
      return Object.assign({}, state, {
        trackId,
        canPlay: false,
        error: null
      })
    case ActionTypes.STREAM_SUCCESS:
      return Object.assign({}, state, {
        canPlay: true,
        error: null
      })
    case ActionTypes.STREAM_FAILURE:
      return Object.assign({}, state, {
        error
      })
    default:
      return state
  }
}
