import * as ActionTypes from 'constants/ActionTypes'

const isBrowser = typeof window !== 'undefined'

export const AUTH_BASE = isBrowser
  && `${window.location.protocol}//${window.location.host}/auth/soundcloud`
export const AUTH_KEY = 'accessToken'
export const AUTH_ID = 'userId'

export const AuthTypes = {
  // COMMENTS: [
  //   ActionTypes.MY_COMMENTS_REQUEST,
  //   ActionTypes.MY_COMMENTS_SUCCESS,
  //   ActionTypes.MY_COMMENTS_FAILURE,
  //   ActionTypes.MY_COMMENTS_PUT,
  //   ActionTypes.MY_COMMENTS_DELETE
  // ],
  // FOLLOWERS: [
  //   ActionTypes.MY_FOLLOWERS_REQUEST,
  //   ActionTypes.MY_FOLLOWERS_SUCCESS,
  //   ActionTypes.MY_FOLLOWERS_FAILURE
  // ],
  FOLLOWINGS: [
    ActionTypes.MY_FOLLOWINGS_REQUEST,
    ActionTypes.MY_FOLLOWINGS_SUCCESS,
    ActionTypes.MY_FOLLOWINGS_FAILURE,
    ActionTypes.MY_FOLLOWINGS_PUT,
    ActionTypes.MY_FOLLOWINGS_DELETE
  ],
  PLAYLISTS: [
    ActionTypes.MY_PLAYLISTS_REQUEST,
    ActionTypes.MY_PLAYLISTS_SUCCESS,
    ActionTypes.MY_PLAYLISTS_FAILURE,
    ActionTypes.MY_PLAYLISTS_PUT,
    ActionTypes.MY_PLAYLISTS_DELETE
  ],
  PROFILE: [
    ActionTypes.MY_PROFILE_REQUEST,
    ActionTypes.MY_PROFILE_SUCCESS,
    ActionTypes.MY_PROFILE_FAILURE
  ],
  TRACKS: [
    ActionTypes.MY_TRACKS_REQUEST,
    ActionTypes.MY_TRACKS_SUCCESS,
    ActionTypes.MY_TRACKS_FAILURE,
    ActionTypes.MY_TRACKS_PUT,
    ActionTypes.MY_TRACKS_DELETE
  ],
  TRACK_ACTIVITIES: [
    ActionTypes.MY_TRACK_ACTIVITIES_REQUEST,
    ActionTypes.MY_TRACK_ACTIVITIES_SUCCESS,
    ActionTypes.MY_TRACK_ACTIVITIES_FAILURE
  ],
  DEL: {
    // COMMENTS: ActionTypes.MY_COMMENTS_DELETE,
    FOLLOWINGS: ActionTypes.MY_FOLLOWINGS_DELETE,
    PLAYLISTS: ActionTypes.MY_PLAYLISTS_DELETE,
    TRACKS: ActionTypes.MY_TRACKS_DELETE
  }
}
