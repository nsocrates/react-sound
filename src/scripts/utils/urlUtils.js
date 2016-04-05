import queryString from 'query-string'
import { ROOT, CLIENT_ID, CONNECT, DATA } from 'constants/ApiConstants'

export function constructUrlFromEndpoint(endpoint) {
  if (endpoint.indexOf(ROOT) === -1) {
    return ROOT + endpoint + queryString.stringify(DATA)
  }

  return endpoint
}

export function constructStreamUrl(trackId) {
  const url = `${ROOT}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return !!trackId && url
}

export function constructConnectUrl(opts) {
  return `${CONNECT}?${queryString.stringify(opts)}`
}
