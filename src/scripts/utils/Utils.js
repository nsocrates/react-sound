import { API_ROOT, API_DATA, CLIENT_ID } from 'constants/Api'
import { IMG_FORMAT, IMG_FALLBACK } from 'constants/ItemLists'

// Constructs url from endpoint.
export function constructUrl(endpoint) {
  if (endpoint.indexOf(API_ROOT) === -1) {
    return API_ROOT + endpoint + API_DATA
  }

  return endpoint
}

// Constructs stream url from track id.
export function constructStreamUrl(trackId) {
  const url = `${API_ROOT}/tracks/${trackId}/stream/?${CLIENT_ID}`

  return trackId ? url : null
}

// Returns an array of streamable tracks from a list of ids
export function extractStreamable(trackEntity, ids) {
  return ids.filter(id => (
    trackEntity[id].streamable
  ))
}

// Extracts number from string:
export function extractNumber(string) {
  const number = string.match(/\d/g).join('')

  return number
}

// Formats timestamp to "month day, year"
export function dtFormatter(timestamp) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const dt = new Date(timestamp)
  return `${monthNames[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
}

// Returns urls for various image sizes
export function getCover(url) {
  const cover = url || ''

  if (cover.indexOf('default_avatar_large.png') > -1) {
    return {
      xLarge: IMG_FALLBACK.AVATAR.LARGE,
      large: IMG_FALLBACK.AVATAR.LARGE,
      default: IMG_FALLBACK.AVATAR.LARGE,
      badge: IMG_FALLBACK.AVATAR.SMALL
    }
  }

  return {
    xLarge: cover.replace(/large/, IMG_FORMAT.XLARGE) || IMG_FALLBACK.PLACEHOLDER.XLARGE,
    large: cover.replace(/large/, IMG_FORMAT.LARGE) || IMG_FALLBACK.PLACEHOLDER.LARGE,
    default: cover || IMG_FALLBACK.PLACEHOLDER.MEDIUM,
    badge: cover.replace(/large/, IMG_FORMAT.BADGE) || IMG_FALLBACK.PLACEHOLDER.BADGE
  }
}

// Extracts useful media data:
export const trackFactory = obj => {
  const { userObject, mediaObject } = obj

  if (!mediaObject || !userObject) {
    return null
  }

  function parseGenre(genres) {
    return genres.split(' , ')
  }

  function parseTags(tags) {
    const regex = /"[^"]*"|[^\s"]+/g
    return tags.match(regex)
               .map(item => item.replace(/"/g, ''))
  }

  const title = mediaObject.title.split(' - ')
  const data = {
    user: {
      id: userObject.id,
      name: userObject.username
    },
    media: {
      id: mediaObject.id,
      name: title[1] || title[0]
    },
    artwork: getCover(mediaObject.artwork_url),
    createdAt: dtFormatter(mediaObject.created_at),
    description: mediaObject.description || null,
    download: mediaObject.downloadable
              ? `${mediaObject.download_url}?client_id=${CLIENT_ID}`
              : null,
    genre: mediaObject.genre ? parseGenre(mediaObject.genre) : [],
    kind: mediaObject.kind,
    tags: mediaObject.tag_list ? parseTags(mediaObject.tag_list, /"[^"]*"|[^\s"]+/g) : []
  }

  let rest
  if (mediaObject.kind === 'track') {
    const {
      favoritings_count: favorites = 0,
      likes_count: likes = 0
    } = mediaObject
    const count = favorites > likes ? favorites : likes
    rest = {
      stats: {
        plays: mediaObject.playback_count,
        favorites: count,
        comments: mediaObject.comment_count
      }
    }
  } else if (mediaObject.kind === 'playlist') {
    rest = {
      tracklist: {
        count: mediaObject.track_count,
        ids: mediaObject.tracks
      }
    }
  }

  return Object.assign({}, data, rest)
}

// Formats seconds into readable time:
export const timeFactory = seconds => ({
  getHours() {
    const hh = `0${Math.floor(seconds / 3600)}`
    return hh.substr(-2)
  },
  getMinutes() {
    const mm = `0${Math.floor((seconds % 3600) / 60)}`
    return mm.substr(-2)
  },
  getSeconds() {
    const ss = `0${Math.floor(seconds % 60)}`
    return ss.substr(-2)
  },
  getFormatted() {
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

// Adds comma for numbers of more than 3 digits
export function markNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Splits paragraphs into array; separates link from paragraph
export function splitLines(string) {
  /**
   * http://daringfireball.net/2010/07/improved_regex_for_matching_urls
   * http://stackoverflow.com/questions/6927719/url-regex-does-not-work-in-javascript
   */
  const reUrl = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i
  const arr = string.replace(/<.+?>|&.*?;|\r/g, '')
                    .split(/\n/)
                    .map(item => item.trim()
                                     .split(reUrl)
                                     .filter(n => !!n))
                    .filter(item => item.length > 0)

  // Sets url to array[1] for consistency
  arr.forEach(item => {
    const another = item

    if (reUrl.test(another.toString()) && !reUrl.test(another[1])) {
      another[1] = another[0]
      another[0] = null
    }

    return another
  })

  return arr
}

export function calculatePages(total, offset) {
  return Math.ceil(total / offset)
}
