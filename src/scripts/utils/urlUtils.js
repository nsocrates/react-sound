import qs from 'query-string'
import { SC_API, CLIENT_ID, DEFAULT_PARAMS } from 'constants/Api'

export function constructUrl(path, userParams = {}) {
  const params = Object.assign({}, DEFAULT_PARAMS, userParams)
  return `${path}?${qs.stringify(params)}`
}

export function constructUrlFromEndpoint(endpoint, userParams = {}) {
  const params = Object.assign({}, DEFAULT_PARAMS, userParams)
  const separator = endpoint.indexOf('?') !== -1 ? '&' : '?'
  if (endpoint.indexOf('soundcloud.com') === -1) {
    return SC_API + endpoint + separator + qs.stringify(params)
  }

  return endpoint + separator + qs.stringify(userParams)
}

export function constructStreamUrl(trackId) {
  const url = `${SC_API}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return !!trackId && url
}
