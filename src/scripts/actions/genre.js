/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { CALL_API } from 'constants/Api'
import { Schemas } from 'constants/Schemas'

// Fetches a collection of tracks for a particular genre:
function fetchGenre(genre, next_href) {
  return {
    genre,
    [CALL_API]: {
      types: [
        ActionTypes.GENRE_REQUEST,
        ActionTypes.GENRE_SUCCESS,
        ActionTypes.GENRE_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }
  }
}

export function loadGenre(genre, next = false) {
  return (dispatch, getState) => {
    const decoded = decodeURIComponent(genre.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      ids = [],
      next_href = `/tracks?genres=${encoded}&`
    } = getState().app.partition.tracksByGenre[decoded] || {}

    if (ids.length && !next) {
      return null
    }

    return dispatch(fetchGenre(decoded, next_href))
  }
}
