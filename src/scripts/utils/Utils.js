import { API_ROOT, API_DATA, CLIENT_ID } from 'constants/Api'

// Constructs url from endpoint.
export function constructUrl(endpoint) {
  if (endpoint.indexOf(API_ROOT) === -1) {
    return API_ROOT + endpoint + API_DATA
  }

  return endpoint + API_DATA
}

// Constructs stream url from track id.
export function constructStreamUrl(trackId) {
  const url = `${API_ROOT}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return trackId ? url : null
}

// Formats images to -crop.
export function formatImages(json) {
  const defaultAvatar = /default_avatar_large/g

  for (const item of json) {
    if (item.artwork_url) {
      item.artwork_url = item.artwork_url.replace(/large/gi, 'crop')
    }
    if (!defaultAvatar.test(item.user.avatar_url)) {
      item.user.avatar_url = item.user.avatar_url.replace(/large/gi, 'crop')
    }
  }

  return json
}
