import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'
import { requestStream } from 'actions/stream'
import { trackFactory } from 'utils/Utils'

export default class Tracklist extends React.Component {
  render() {
    const { ids, userEntity, trackEntity, trackId, isPlaying, modifier } = this.props

    const renderTracklist = ids.map((id, index) => {
      const mediaObject = trackEntity[id]
      const obj = {
        mediaObject,
        userObject: userEntity[trackEntity[id].user_id]
      }
      const isCurrentTrack = trackId === id
      const isSet = modifier === 'set'
      const isPlayer = modifier === 'player'
      const trackData = trackFactory(obj)

      const _shouldRenderDownload = () => {
        if (trackData.download) {
          return (
            <button className={`tracklist--${modifier}__btn`}>
              <a href={ trackData.download }>
                <i className={`tracklist--${modifier}__icon fa fa-download`} />
              </a>
            </button>
          )
        }

        return null
      }

      const _handlePlayPause = e => {
        if (!mediaObject.streamable) {
          return window.open(mediaObject.permalink_url)
        }
        e.preventDefault()
        const { dispatch } = this.props
        const audio = document.getElementById('audio')

        if (isCurrentTrack) {
          return isPlaying ? audio.pause() : audio.play()
        }

        return dispatch(requestStream(id))
      }

      const isSoundCloud = classNames(`tracklist--${modifier}__btn`, {
        'tracklist__btn--sc': !mediaObject.streamable
      })
      const isPauseOrPlay = classNames(`tracklist--${modifier}__icon fa`, {
        'fa-play': !isCurrentTrack || !isPlaying,
        'fa-pause': isPlaying && isCurrentTrack,
        'tracklist__icon--sc fa-soundcloud': !mediaObject.streamable
      })
      const isEven = classNames(`tracklist--${modifier}__track`, {
        'tracklist--set__track--even': index % 2 === 0 && isSet
      })
      const isActive = classNames(isEven, {
        'tracklist--player__active': isCurrentTrack && isPlayer,
        'tracklist--set__active': isCurrentTrack && isSet
      })
      const shouldFilter = classNames(`tracklist--${modifier}__artwork`, {
        'tracklist--set__filter fa': isCurrentTrack && isSet,
        'tracklist--player__filter fa': isCurrentTrack && isPlayer
      })
      return (
        <li
          className={ isActive }
          key={ `tracklist--${modifier}__${index}_${id}` }
        >
          <aside className={ shouldFilter }>
            <img
              className="tracklist__img"
              src={ trackData.artwork.badge }
            />
          </aside>

            <section className={`tracklist--${modifier}__icons`}>

              { _shouldRenderDownload() }

              <button
                className={ isSoundCloud }
                onClick={ _handlePlayPause }
              >
                <i className={ isPauseOrPlay } />
              </button>

              <button className={`tracklist--${modifier}__btn tracklist__btn--heart`}>
                <i className={`
                  tracklist--${modifier}__icon
                  tracklist__icon--heart fa fa-heart-o
                  `}
                />
              </button>

            </section>

            <section className="tracklist__data">
              <p className={`tracklist--${modifier}__title`}>
                <LinkItem
                  className="tracklist__link"
                  to={`#track/${trackData.media.id}`}
                >
                  { trackData.media.name }
                </LinkItem>
              </p>
              <p className={`tracklist--${modifier}__user`}>
                <LinkItem
                  className="tracklist__link"
                  to={`#user/${trackData.user.id}`}
                >
                  { trackData.user.name }
                </LinkItem>
              </p>
            </section>

        </li>
      )
    })

    return (
      <ul className={`tracklist--${modifier}__wrapper`}>
        { renderTracklist }
      </ul>
    )
  }
}

Tracklist.defaultProps = {
  dispatch() {},
  modifier: 'player'
}

Tracklist.propTypes = {
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  modifier: PropTypes.string,
  trackEntity: PropTypes.object,
  trackId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  ids: PropTypes.array,
  userEntity: PropTypes.object
}
