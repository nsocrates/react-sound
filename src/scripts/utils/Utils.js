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
  const url = `${API_ROOT}/tracks/${trackId}/stream/?client_id=${CLIENT_ID}`

  return trackId ? url : null
}

// Extracts number from string:
export function extractNumber(string) {
  const number = string.match(/\d/g).join('')

  return number
}

// Extracts useful media data:
export const trackFactory = obj => {
  const { id, userEntity, mediaEntity } = obj

  function parseTags(list) {
    const regex = /"[^"]*"|[^\s"]+/g
    return list.match(regex)
               .map(item => item.replace(/"/g, ''))
  }

  function dtFormater(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                        'July', 'Aug','Sept', 'Oct', 'Nov', 'Dec']
    const dt = new Date(date)
    return `${monthNames[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
  }

  function getCover(url) {
    const cover = url || ''

    return {
      xLarge: cover.replace(/large/, IMG_FORMAT.XLARGE) || IMG_FALLBACK.PLACEHOLDER.XLARGE,
      large: cover.replace(/large/, IMG_FORMAT.LARGE) || IMG_FALLBACK.PLACEHOLDER.LARGE,
      medium: cover || IMG_FALLBACK.PLACEHOLDER.MEDIUM,
      badge: cover.replace(/large/, IMG_FORMAT.BADGE) || IMG_FALLBACK.PLACEHOLDER.BADGE
    }
  }

  if (id) {
    const entity = mediaEntity[id]
    const userId = entity.user_id
    const title = entity.title.split(' - ')
    const data = {
      user: {
        id: userId,
        name: userEntity[userId].username
      },
      media: {
        id,
        name: title[1] || title[0],
        kind: entity.kind
      },
      artwork: getCover(entity.artwork_url),
      download: entity.downloadable ? `${entity.download_url}?client_id=${CLIENT_ID}` : null,
      tags: entity.tag_list ? parseTags(entity.tag_list) : null,
      createdAt: dtFormater(entity.created_at),
      genre: entity.genre
    }

    let rest
    if (entity.kind === 'track') {
      const { favoritings_count: favorites, likes_count: likes } = entity
      const count = favorites > likes ? favorites : likes
      rest = {
        stats: {
          plays: entity.playback_count,
          favorites: count
        }
      }
    } else if (entity.kind === 'playlist') {
      rest = {
        trackList: entity.tracks
      }
    }

    return Object.assign({}, data, rest)
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

  // Sets url to array[1] for consistency
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
