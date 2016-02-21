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

// Extracts number from string:
export function extractNumber(string) {
  const number = string.match(/\d/g).join('')

  return number
}

// Extracts useful track data:
export const trackFactory = obj => {
  const { trackId, userEntity, trackEntity } = obj

  function parseTags(list) {
    const regex = /"[^"]*"|[^\s"]+/g
    return list.match(regex)
               .map(item => item.replace(/"/g, ''))
  }

  function dateFormater(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                        'July', 'Aug','Sept', 'Oct', 'Nov', 'Dec']
    const dt = new Date(date)
    return `${monthNames[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
  }

  function getArtwork(format) {
    const track = trackEntity[trackId]
    const artwork = track.artwork_url || null

    if (artwork) {
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

  if (trackId) {
    const track = trackEntity[trackId]
    const userId = track.user_id
    const title = track.title.split(' - ')

    return {
      user: {
        id: userId,
        name: userEntity[userId].username
      },
      track: {
        id: trackId,
        name: title[1] || title[0]
      },
      artwork: {
        xLarge: getArtwork(IMG_FORMAT.XLARGE),
        large: getArtwork(IMG_FORMAT.LARGE),
        medium: track.artwork_url || null,
        badge: getArtwork(IMG_FORMAT.BADGE)
      },
      download: track.downloadable ? `${track.download_url}?client_id=${CLIENT_ID}` : null,
      tags: track.tag_list ? parseTags(track.tag_list) : null,
      createdAt: dateFormater(track.created_at)
    }
  }
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

// Prefixes numbers >= 1000
export function kFormatter(number) {
  return number > 999 ? `${Number((number / 1000).toFixed(1))}k` : number
}

// Splits paragraphs into array; separates link from paragraph
export function splitLines(string) {
  /**
   * http://daringfireball.net/2010/07/improved_regex_for_matching_urls
   * http://stackoverflow.com/questions/6927719/url-regex-does-not-work-in-javascript
   */
  const reUrl = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i
  const arr = string.split(/\n/)
                    .map(item => item.split(reUrl)
                                     .filter(n => !!n))
                    .filter(item => item.length > 0)

  // Sets url to array[1]
  arr.forEach(item => {
    const another = item

    if (another.toString().match(reUrl) && !another[1]) {
      another[1] = another[0]
      another[0] = null

      return another
    }
  })

  return arr
}
