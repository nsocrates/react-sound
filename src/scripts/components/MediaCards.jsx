import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import End from 'components/End'
import MediaCardItem from 'components/MediaCardItem'
import Taglist from 'components/Taglist'

import { requestStream, loadStreamList } from 'actions/stream'
import { updateMyTracks, updateMyPlaylists } from 'actions/auth'

import { trackFactory, dtFormatter, kFormatter, timeFactory } from 'utils/Utils'
import { REQ } from 'constants/Auth'

function MediaCards(props) {
  const {
    children = null,
    className = 'cards',
    collectionIds = [],
    dispatch,
    endMsg,
    hasHead = false,
    ids = [],
    isPlaying,
    isPlaylist,
    maxCards = undefined,
    maxTags = 5,
    mediaEntity = {},
    streamTrackId,
    userEntity = {}
  } = props

  if (!ids.length) {
    return (
      <article className="end-wrapper">
        <End className="end--bottom" text={ endMsg } />
      </article>
    )
  }

  const cardItems = ids.slice(0, maxCards).map((card, index) => {
    const id = card.id || card

    const obj = {
      userObject: userEntity[mediaEntity[id].user_id],
      mediaObject: mediaEntity[id]
    }
    const mediaData = trackFactory(obj)
    const isFavorite = collectionIds.indexOf(id) !== -1
    const mediaPath = isPlaylist ? `#playlist/${id}` : `#track/${id}`

    const getStats = () => {
      if (isPlaylist) {
        return [{
          title: 'duration',
          icon: 'clock-o',
          value: timeFactory(obj.mediaObject.duration / 1000).getShorthand()
        }, {
          title: 'tracks',
          icon: 'list',
          value: kFormatter(mediaData.tracklist.count)
        }]
      }

      return [{
        title: 'duration',
        icon: 'clock-o',
        value: timeFactory(obj.mediaObject.duration / 1000).getShorthand()
      }, {
        title: 'plays',
        icon: 'headphones',
        value: kFormatter(mediaData.stats.plays)
      }, {
        title: 'favorites',
        icon: 'heart-o',
        value: kFormatter(mediaData.stats.favorites)
      }]
    }

    const handleClickPlay = e => {
      e.preventDefault()

      if (isPlaylist) {
        return dispatch(loadStreamList(mediaData.tracklist.ids))
      }
      const audio = document.getElementById('audio')
      if (id === streamTrackId) {
        return isPlaying ? audio.pause() : audio.play()
      }

      return dispatch(requestStream(id))
    }

    const handleClickFav = e => {
      e.preventDefault()

      const collectionHandler = isPlaylist ? updateMyPlaylists : updateMyTracks

      return isFavorite
        ? dispatch(collectionHandler(REQ.DEL, id, mediaData.media.name))
        : dispatch(collectionHandler(REQ.PUT, id, mediaData.media.name))
    }

    const head = (
      <section className="card__head">
        <h6 className="card__data">{`Added on ${dtFormatter(card.created_at)}`}</h6>
      </section>
    )

    return (
      <MediaCardItem
        byline={ mediaData.user.name }
        bylinePath={ `#user/${mediaData.user.id}` }
        meta={ `Created ${mediaData.createdAt}` }
        dispatch={ dispatch }
        head={ hasHead ? head : undefined }
        imgUrl={ mediaData.artwork.large }
        isFavorite={ isFavorite }
        key={ `${id}${index}` }
        onClickFav={ handleClickFav }
        onClickPlay={ handleClickPlay }
        stats={ getStats() }
        title={ mediaData.media.name }
        titlePath={ mediaPath }
      >
        <Taglist max={ maxTags } tags={ mediaData.tags } />
      </MediaCardItem>
    )
  })

  return (
    <section className={ className }>
      { cardItems }
      { children }
    </section>
  )
}

MediaCards.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  collectionIds: PropTypes.arrayOf(PropTypes.number.isRequired),
  dispatch: PropTypes.func.isRequired,
  endMsg: PropTypes.string,
  hasHead: PropTypes.bool,
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.object.isRequired
    ])
  ),
  isPlaying: PropTypes.bool,
  isPlaylist: PropTypes.bool,
  maxCards: PropTypes.number,
  maxTags: PropTypes.number,
  mediaEntity: PropTypes.object.isRequired,
  mediaPath: PropTypes.string,
  streamTrackId: PropTypes.number,
  userEntity: PropTypes.object.isRequired
}

export default connect()(MediaCards)
