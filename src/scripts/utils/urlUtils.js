import qs from 'query-string'
import { BASE, CLIENT_ID, DEFAULT_PARAMS } from 'constants/Api'

export function constructUrl(path, params = DEFAULT_PARAMS) {
  return `${path}?${qs.stringify(params)}`
}

export function constructUrlFromEndpoint(endpoint, params = DEFAULT_PARAMS) {
  const separator = endpoint.indexOf('?') !== -1 ? '&' : '?'
  if (endpoint.indexOf(BASE) === -1) {
    return BASE + endpoint + separator + qs.stringify(params)
  }

  return endpoint
}

export function constructStreamUrl(trackId) {
  const url = `${BASE}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return !!trackId && url
}
