import { API_ROOT, API_DATA, CLIENT_ID } from 'constants/Api'
import { IMG_FORMAT } from 'constants/ItemLists'

// Constructs url from endpoint.
export function constructUrl(endpoint) {
  if (endpoint.indexOf(API_ROOT) === -1) {
    return API_ROOT + endpoint + API_DATA
  }

  return endpoint
}

// Constructs stream url from track id.
export function constructStreamUrl(trackId) {
  const url = `${API_ROOT}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return trackId ? url : null
}

// Extracts useful track data:
export const trackFactory = obj => {
  const { trackId, userEntity, trackEntity } = obj
  let trackData = {
    userName: null,
    songName: null,
    getArtwork() {}
  }

  if (trackId) {
    const userId = trackEntity[trackId].user_id
    const title = trackEntity[trackId].title.split(' - ')
    trackData = {
      userName: userEntity[userId].username,
      songName: title[1] || title[0],
      fallback: 'https://s-media-cache-ak0.pinimg.com/474x/1c/76/36/1c7636906717be2719923f3e83c4502c.jpg',
      getArtwork(format) {
        let artwork
        if (!trackEntity[trackId].artwork_url) {
          artwork = userEntity[userId].avatar_url
        } else {
          artwork = trackEntity[trackId].artwork_url
        }
        switch (format) {
          case IMG_FORMAT.XLARGE:
            return artwork.replace(/large/, IMG_FORMAT.XLARGE)
          case IMG_FORMAT.LARGE:
            return artwork.replace(/large/, IMG_FORMAT.LARGE)
          case IMG_FORMAT.BADGE:
            return artwork.replace(/large/, IMG_FORMAT.BADGE)
          default:
            return artwork
        }
      }
    }
  }
  return trackData
}

// Formats seconds into readable time:
export const timeFactory = time => ({
  getHours() {
    const hours = `0${Math.floor(time / 3600)}`
    return hours.substr(-2)
  },
  getMinutes() {
    const minutes = `0${Math.floor((time % 3600) / 60)}`
    return minutes.substr(-2)
  },
  getSeconds() {
    const seconds = `0${Math.floor(time % 60)}`
    return seconds.substr(-2)
  },
  getFormated() {
    const hh = this.getHours()
    const mm = this.getMinutes()
    const ss = this.getSeconds()
    const hasHours = parseInt(hh, 10) ? `${hh}:` : ''
    return `${hasHours}${mm}:${ss}`
  }
})

// Determines coordinates relative to target based on cursor position:
export const coordinatesFactory = event => {
  const getOffsets = target => (
    target.getBoundingClientRect()
  )

  return {
    getValueX: (target = event.currentTarget) => {
      const { width, left } = getOffsets(target)
      const { clientX } = event
      const value = (clientX - left) / width

      return Math.round(value * 1e2) / 1e2
    },
    getValueY: (target = event.currentTarget) => {
      const { height, bottom } = getOffsets(target)
      const { clientY } = event
      const value = (bottom - clientY) / height

      return Math.round(value * 1e2) / 1e2
    },
    clip: (value, min = 0, max = 1) => (
      Math.min(Math.max(value * max, min), max)
    )
  }
}
