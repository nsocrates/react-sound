import qs from 'query-string'
import { BASE, CLIENT_ID, PARAMS } from 'constants/ApiConstants'

export function constructUrl(path, params = PARAMS) {
  return `${path}?${qs.stringify(params)}`
}

export function constructUrlFromEndpoint(endpoint, params = PARAMS) {
  if (endpoint.indexOf(BASE) === -1) {
    return BASE + endpoint + qs.stringify(params)
  }

  return endpoint
}

export function constructStreamUrl(trackId) {
  const url = `${BASE}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return !!trackId && url
}
