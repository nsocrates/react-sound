import timeFactory from './timeFactory'
import { formatCover, dtFormatter } from './formatUtils'
import { CLIENT_ID } from 'constants/Api'

export default function mediaFactory({ userObject, mediaObject }) {
  userObject = userObject || { avatar_url: '' }
  mediaObject = mediaObject || { title: '' }

  function parseGenre(genres = []) {
    return genres.split(' , ')
  }

  function parseTags(tags = '') {
    const regex = /"[^"]*"|[^\s"]+/g
    return (tags.match(regex) || [])
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
    artwork: formatCover(mediaObject.artwork_url),
    createdAt: dtFormatter(mediaObject.created_at),
    description: mediaObject.description || null,
    download: mediaObject.downloadable
              ? `${mediaObject.download_url}?client_id=${CLIENT_ID}`
              : null,
    duration: timeFactory(mediaObject.duration / 1000).getFormatted(),
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
