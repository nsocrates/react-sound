import React, { PropTypes } from 'react'
import classNames from 'classnames'
import mediaFactory from 'utils/mediaFactory'
import TracklistItem from 'components/TracklistItem'
import { removeTrack } from 'actions/player'
import { requestStream } from 'actions/stream'
import { updateMyTracks } from 'actions/collection'

export default class Tracklist extends React.Component {
  render() {
    const {
      ids,
      dispatch,
      userEntity,
      trackEntity,
      trackId,
      isPlaying,
      modifier,
      trackCollection
    } = this.props

    const renderTracklistItems = ids.map((id, index) => {
      const mediaObject = trackEntity[id]
      const obj = {
        mediaObject,
        userObject: userEntity[trackEntity[id].user_id]
      }
      const isCurrentTrack = trackId === id
      const isSet = modifier === 'set'
      const isPlayer = modifier === 'player'
      const hasFavorites = !!trackCollection.length
      const trackData = mediaFactory(obj)

      function handlePlayPause(e) {
        if (!mediaObject.streamable) {
          return window.open(mediaObject.permalink_url)
        }
        e.preventDefault()
        const audio = document.getElementById('audio')

        if (isCurrentTrack) {
          return isPlaying ? audio.pause() : audio.play()
        }

        return dispatch(requestStream(id))
      }

      function handleAddToFavorites(e) {
        e.preventDefault()
        return dispatch(updateMyTracks(id, trackData.media.name))
      }

      function handleRemoveTrack(e) {
        e.preventDefault()
        return dispatch(removeTrack(id, trackData.media.name))
      }

      const isEven = classNames(`tracklist-${modifier}__track`, {
        'tracklist-set__track--even': index % 2 === 0 && isSet
      })
      const isActive = classNames(isEven, {
        'tracklist-player__active': isCurrentTrack && isPlayer
      })
      const isFavorite =
        classNames(`tracklist-${modifier}__btn tracklist-${modifier}__btn--heart`, {
          'tracklist__btn--fav': hasFavorites && trackCollection.indexOf(id) !== -1
        })
      const isPauseOrPlay = classNames(`tracklist-${modifier}__icon fa`, {
        'fa-play': !isCurrentTrack || !isPlaying,
        'fa-pause': isPlaying && isCurrentTrack,
        'tracklist__icon--sc fa-soundcloud': !mediaObject.streamable
      })
      const isSoundCloud = classNames(`tracklist-${modifier}__btn`, {
        'tracklist__btn--sc': !mediaObject.streamable
      })
      const shouldFilter = classNames(`tracklist-${modifier}__artwork`, {
        'tracklist-set__filter fa': isCurrentTrack && isSet,
        'tracklist-player__filter fa': isCurrentTrack && isPlayer
      })

      return (
        <TracklistItem
          key={`${id}__${index}`}
          downloadUrl={ trackData.download }
          duration={ trackData.duration }
          handleAddToFavorites={ handleAddToFavorites }
          handlePlayPause={ handlePlayPause }
          handleRemoveTrack={ handleRemoveTrack }
          isActive={ isActive }
          isFavorite={ isFavorite }
          isPauseOrPlay={ isPauseOrPlay }
          isSoundCloud={ isSoundCloud }
          modifier={ modifier }
          shouldFilter={ shouldFilter }
          trackArtwork={ trackData.artwork.badge }
          trackId={ trackData.media.id }
          trackName={ trackData.media.name }
          userId={ trackData.user.id }
          userName={ trackData.user.name }
        />
      )
    })

    return (
      <ul className={`tracklist-${modifier}__wrapper`}>
        { renderTracklistItems }
      </ul>
    )
  }
}

Tracklist.defaultProps = {
  ids: [],
  modifier: 'player'
}

Tracklist.propTypes = {
  dispatch: PropTypes.func,
  ids: PropTypes.array,
  isPlaying: PropTypes.bool,
  modifier: PropTypes.string,
  trackCollection: PropTypes.array,
  trackEntity: PropTypes.object,
  trackId: PropTypes.number,
  userEntity: PropTypes.object
}
