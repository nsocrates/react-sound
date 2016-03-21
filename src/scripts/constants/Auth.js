import * as ActionTypes from 'constants/ActionTypes'

export const AUTH = {
  KEY: 'x-1A6oIyD8i3_Lh0-3ksX5nfpfI',
  SERVICE: 'soundcloud',
  CALL: Symbol('Call AUTH')
}

export const REQ = {
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DEL: 'DEL'
}

export const AUTH_TYPES = {
  PROFILE: [
    ActionTypes.MY_PROFILE_REQUEST,
    ActionTypes.MY_PROFILE_SUCCESS,
    ActionTypes.MY_PROFILE_FAILURE
  ],
  COMMENTS: [
    ActionTypes.MY_COMMENTS_REQUEST,
    ActionTypes.MY_COMMENTS_SUCCESS,
    ActionTypes.MY_COMMENTS_FAILURE
  ],
  FAVORITES: [
    ActionTypes.MY_FAVORITES_REQUEST,
    ActionTypes.MY_FAVORITES_SUCCESS,
    ActionTypes.MY_FAVORITES_FAILURE
  ],
  PLAYLISTS: [
    ActionTypes.MY_PLAYLISTS_REQUEST,
    ActionTypes.MY_PLAYLISTS_SUCCESS,
    ActionTypes.MY_PLAYLISTS_FAILURE
  ],
  TRACKS: [
    ActionTypes.MY_TRACKS_REQUEST,
    ActionTypes.MY_TRACKS_SUCCESS,
    ActionTypes.MY_TRACKS_FAILURE
  ],
  DEL: {
    FAVORITES: ActionTypes.MY_FAVORITES_DELETE
  }
}
