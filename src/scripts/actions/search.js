import * as ActionTypes from 'constants/ActionTypes'
import { Schemas } from 'constants/Schemas'
import { callApi } from 'actions/call'

export function loadSearch(input, next = false) {
  return (dispatch, getState) => {
    if (!input) {
      return null
    }
    const decoded = decodeURIComponent(input.replace(/\+/g, '%20'))
    const encoded = encodeURIComponent(decoded).replace(/%20/g, '+')
    const {
      next_href = `/tracks/?q=${encoded}`,
      ids = []
    } = getState().app.partition.searchesByInput[decoded] || {}

    const options = {
      types: [
        ActionTypes.SEARCH_REQUEST,
        ActionTypes.SEARCH_SUCCESS,
        ActionTypes.SEARCH_FAILURE
      ],
      endpoint: next_href,
      schema: Schemas.TRACK_ARRAY
    }

    if (ids.length && !next) {
      return null
    }

    return dispatch(callApi({ input: decoded }, options))
  }
}
