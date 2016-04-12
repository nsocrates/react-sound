import * as ActionTypes from 'constants/ActionTypes'

export const CALL_AUTH = Symbol('Call AUTH')
export const AUTH_KEY = 'accessToken'
export const AUTH_ID = 'userId'

export const AuthReq = {
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DEL: 'DEL'
}

export const AuthTypes = {
  COMMENTS: [
    ActionTypes.MY_COMMENTS_REQUEST,
    ActionTypes.MY_COMMENTS_SUCCESS,
    ActionTypes.MY_COMMENTS_FAILURE
  ],
  FOLLOWINGS: [
    ActionTypes.MY_FOLLOWINGS_REQUEST,
    ActionTypes.MY_FOLLOWINGS_SUCCESS,
    ActionTypes.MY_FOLLOWINGS_FAILURE
  ],
  PLAYLISTS: [
    ActionTypes.MY_PLAYLISTS_REQUEST,
    ActionTypes.MY_PLAYLISTS_SUCCESS,
    ActionTypes.MY_PLAYLISTS_FAILURE
  ],
  PROFILE: [
    ActionTypes.MY_PROFILE_REQUEST,
    ActionTypes.MY_PROFILE_SUCCESS,
    ActionTypes.MY_PROFILE_FAILURE
  ],
  TRACKS: [
    ActionTypes.MY_TRACKS_REQUEST,
    ActionTypes.MY_TRACKS_SUCCESS,
    ActionTypes.MY_TRACKS_FAILURE
  ],
  DEL: {
    COMMENTS: ActionTypes.MY_COMMENTS_DELETE,
    FOLLOWINGS: ActionTypes.MY_FOLLOWINGS_DELETE,
    PLAYLISTS: ActionTypes.MY_PLAYLISTS_DELETE,
    TRACKS: ActionTypes.MY_TRACKS_DELETE
  }
}
