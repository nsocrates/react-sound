const initialState = {
  result: []
}

export default function comments(state = initialState, action) {
  if (action.response && action.type === 'TRACK_COMMENTS_SUCCESS') {
    return Object.assign({}, state, {
      result: action.response.result
    })
  }

  return state
}
