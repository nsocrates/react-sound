/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/reducers/index.js
 */

import merge from 'lodash/merge'

// Updates an entity cache in response to any action with response.entities:
const initialState = {
  playlists: {},
  tracks: {},
  users: {}
}

export default function entities(state = initialState, action) {
  if (action.response && action.response.entities && action.response.entities.comments) {
    const trackEntity = merge({}, state.tracks[action.id], {
      comments: action.response.entities.comments
    })
    return merge({}, state, {
      tracks: { [action.id]: trackEntity } },
      { users: action.response.entities.users })
  }

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
