/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/reducers/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import partitionate from 'utils/partitionate'
import { combineReducers } from 'redux'

// Updates partition data for different actions:
const partition = combineReducers({
  tracksByUser: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.USER_TRACKS_REQUEST,
      ActionTypes.USER_TRACKS_SUCCESS,
      ActionTypes.USER_TRACKS_FAILURE
    ]
  }),
  playlistsByUser: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.PLAYLIST_REQUEST,
      ActionTypes.PLAYLIST_SUCCESS,
      ActionTypes.PLAYLIST_FAILURE
    ]
  }),
  favoritesByUser: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.FAVORITE_REQUEST,
      ActionTypes.FAVORITE_SUCCESS,
      ActionTypes.FAVORITE_FAILURE
    ]
  }),
  tracksByGenre: partitionate({
    mapActionToKey: action => action.genre,
    types: [
      ActionTypes.GENRE_REQUEST,
      ActionTypes.GENRE_SUCCESS,
      ActionTypes.GENRE_FAILURE
    ]
  }),
  searchesByInput: partitionate({
    mapActionToKey: action => action.input,
    types: [
      ActionTypes.SEARCH_REQUEST,
      ActionTypes.SEARCH_SUCCESS,
      ActionTypes.SEARCH_FAILURE
    ]
  }),
  tracksByTag: partitionate({
    mapActionToKey: action => action.tag,
    types: [
      ActionTypes.TAG_REQUEST,
      ActionTypes.TAG_SUCCESS,
      ActionTypes.TAG_FAILURE
    ]
  }),
  commentsByTrack: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.TRACK_COMMENTS_REQUEST,
      ActionTypes.TRACK_COMMENTS_SUCCESS,
      ActionTypes.TRACK_COMMENTS_FAILURE
    ]
  }),
  followersByUser: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.FOLLOWERS_REQUEST,
      ActionTypes.FOLLOWERS_SUCCESS,
      ActionTypes.FOLLOWERS_FAILURE
    ]
  }),
  followingsByUser: partitionate({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.FOLLOWINGS_REQUEST,
      ActionTypes.FOLLOWINGS_SUCCESS,
      ActionTypes.FOLLOWINGS_FAILURE
    ]
  })
})

export default partition
