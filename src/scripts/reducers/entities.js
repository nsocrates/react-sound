import merge from 'lodash/object/merge'

// Updates an entity cache in response to any action with response.entities:
const initialState = {
  playlists: {},
  tracks: {},
  users: {}
}

export default function entities(state = initialState, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
