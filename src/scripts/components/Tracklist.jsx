import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'
import { requestStream } from 'actions/stream'
import { trackFactory } from 'utils/Utils'

export default class Tracklist extends React.Component {
  render() {
    const { ids, userEntity, trackEntity, trackId, isPlaying, modifier } = this.props

    const renderTracklist = ids.map((id, index) => {
      const obj = { userEntity, mediaObject: trackEntity[id] }
      const isCurrentTrack = trackId === id
      const trackData = trackFactory(obj)

      const shouldRenderDownload = () => {
        if (trackData.download) {
          return (
            <button className={`tracklist__btn--${modifier}`}>
              <a href={ trackData.download }>
                <i className={`tracklist__icon--${modifier} fa fa-download`} />
              </a>
            </button>
          )
        }

        return null
      }

      const _handlePlayPause = e => {
        e.preventDefault()
        const { dispatch } = this.props
        const audio = document.getElementById('audio')

        if (isCurrentTrack) {
          return isPlaying ? audio.pause() : audio.play()
        }

        return dispatch(requestStream(id))
      }

      const isPauseOrPlay = classNames(`tracklist__icon--${modifier} fa`, {
        'fa-play': !isCurrentTrack || !isPlaying,
        'fa-pause': isPlaying && isCurrentTrack
      })
      const isActive = classNames(`tracklist__track--${modifier}`, {
        'tracklist__active--player': isCurrentTrack && modifier === 'player'
      })
      const shouldFilter = classNames(`tracklist__artwork tracklist__artwork--${modifier}`, {
        'tracklist__filter tracklist__filter--set fa': isCurrentTrack && modifier === 'set',
        'tracklist__filter tracklist__filter--player fa': isCurrentTrack && modifier === 'player'
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

            <section className={`tracklist__icons tracklist__icons--${modifier}`}>

              { shouldRenderDownload() }

              <button
                className={`tracklist__btn--${modifier}`}
                onClick={ _handlePlayPause }
              >
                <i className={ isPauseOrPlay } />
              </button>

              <button className={`tracklist__btn--${modifier} tracklist__btn--heart`}>
                <i className={`tracklist__icon--${modifier} tracklist__icon--heart fa fa-heart-o`} />
              </button>

            </section>

            <section className="tracklist__data">
              <p className={`tracklist__title tracklist__title--${modifier}`}>
                <LinkItem
                  className="tracklist__link"
                  to={`#track/${trackData.media.id}`}
                >
                  { trackData.media.name }
                </LinkItem>
              </p>
              <p className={`tracklist__user tracklist__user--${modifier}`}>
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
      <ul className={`tracklist__wrapper--${modifier}`}>
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
