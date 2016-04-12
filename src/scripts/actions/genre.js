/**
 * https://github.com/rackt/redux/blob/master/examples/real-world/actions/index.js
 */

import * as ActionTypes from 'constants/ActionTypes'
import { Schemas } from 'constants/Schemas'
import { callApi } from 'actions/call'

export function loadGenre(genre, next = false) {
  return (dispatch, getState) => {
    const decoded = decodeURIComponent(genre.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      ids = [],
      next_href = `/tracks?genres=${encoded}`
    } = getState().app.partition.tracksByGenre[decoded] || {}

    const options = {
      types: [
        ActionTypes.GENRE_REQUEST,
        ActionTypes.GENRE_SUCCESS,
        ActionTypes.GENRE_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ genre: decoded }, options))
  }
}
