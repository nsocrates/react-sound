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

function loadCached(genre) {
  return {
    genre,
    type: ActionTypes.GENRE_CACHED
  }
}

export function loadGenre(genre, next = true) {
  return (dispatch, getState) => {
    const decoded = decodeURIComponent(genre.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const { tracksByGenre } = getState().app.partition

    const {
      next_href = `/tracks?genres=${encoded}&`,
      offset = 0
    } = tracksByGenre[decoded] || {}
    if (offset > 0 && !next) {
      return dispatch(loadCached(decoded))
    }

    return dispatch(fetchGenre(decoded, next_href))
  }
}
