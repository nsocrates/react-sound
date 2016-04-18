import { AuthTypes } from 'constants/Auth'
import union from 'lodash/union'

const initialState = {
  ids: [],
  isFetching: false,
  error: null,
  next_href: undefined,
  future_href: undefined,
  offset: -1
}

export default function authAffiliations(state = initialState, action) {
  const [requestType, successType, failureType] = AuthTypes.TRACK_ACTIVITIES
  const { response } = action

  switch (action.type) {
    case requestType:
      return Object.assign({}, state, {
        isFetching: true
      })
    case successType:
      return Object.assign({}, state, {
        isFetching: false,
        ids: union(state.ids, response.result),
        next_href: response.next_href,
        future_href: response.future_href,
        offset: action.offset || 24
      })
    case failureType:
      return Object.assign({}, state, {
        isFetching: false,
        error: response.error
      })
    default:
      return state
  }
}
