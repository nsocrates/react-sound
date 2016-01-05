import * as ActionTypes from '../constants/ActionTypes'
import { CALL_API } from '../constants/Api'
import { Schemas } from '../constants/Schemas'

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

export function loadGenre(genre) {
  const value = (genre === 'Drum & Bass') ? 'drum%26bass' : genre

  return (dispatch, getState) => {
    const {
      next_href = `/tracks?genres=${value}&`
    } = getState().app.partition.tracksByGenre[genre] || {}

    return dispatch(fetchGenre(genre, next_href))
  }
}
