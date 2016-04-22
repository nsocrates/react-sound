import * as ActionTypes from 'constants/ActionTypes'

export const AUTH_BASE = '//localhost:8000/auth/soundcloud'
export const AuthTypes = {
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
  OWN_PLAYLISTS: [
    ActionTypes.MY_OWN_PLAYLISTS_REQUEST,
    ActionTypes.MY_OWN_PLAYLISTS_SUCCESS,
    ActionTypes.MY_OWN_PLAYLISTS_FAILURE
  ],
  TRACK_ACTIVITIES: [
    ActionTypes.MY_TRACK_ACTIVITIES_REQUEST,
    ActionTypes.MY_TRACK_ACTIVITIES_SUCCESS,
    ActionTypes.MY_TRACK_ACTIVITIES_FAILURE
  ]
}
