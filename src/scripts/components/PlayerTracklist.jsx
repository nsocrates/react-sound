import React, { PropTypes } from 'react'
import { trackFactory } from 'utils/Utils'
import classNames from 'classnames'
import Button from './Button'

export default class PlayerTracklist extends React.Component {
  render() {
    const { tracklist, userEntity, trackEntity, trackId, audio: { isPlaying }} = this.props

    const renderTracklist = tracklist.ids.map((id, index) => {
      const obj = { id, userEntity, mediaEntity: trackEntity }
      const isCurrentTrack = trackId === id
      const trackData = trackFactory(obj)

      const shouldRenderDownload = () => {
        if (trackData.download) {
          return (
            <Button btnClass="tracklist__btn">
              <a href={ trackData.download }>
                <i className="tracklist__icon fa fa-download" />
              </a>
            </Button>
          )
        }
      }

      const _handlePlayPause = e => {
        e.preventDefault()
        const { actions } = this.props
        const audio = document.getElementById('audio')

        if (isCurrentTrack) {
          return isPlaying ? audio.pause() : audio.play()
        }

        return actions.requestStream(id)
      }

      const isPauseOrPlay = classNames('tracklist__icon fa', {
        'fa-play': !isCurrentTrack || !isPlaying,
        'fa-pause': isPlaying && isCurrentTrack
      })
      const isActive = classNames('tracklist__track', {
        'tracklist__track--active': isCurrentTrack
      })
      const shouldFilter = classNames('tracklist__artwork', {
        'tracklist__artwork--filter fa': isCurrentTrack
      })
      return (
        <li
          className={ isActive }
          key={ `tracklist__${index}_${id}` }
        >
          <aside className={ shouldFilter }>
            <img
              className="tracklist__img"
              src={ trackData.artwork.badge }
            />
          </aside>

            <section className="tracklist__icons">

              { shouldRenderDownload() }

              <Button
                btnClass="tracklist__btn"
                onBtnClick={ _handlePlayPause }
              >
                <i className={ isPauseOrPlay } />
              </Button>

              <Button btnClass="tracklist__btn tracklist__btn--heart">
                <i className="tracklist__icon tracklist__icon--heart fa fa-heart-o" />
              </Button>

            </section>

            <section className="tracklist__data">
              <p className="tracklist__data--title">{ trackData.media.name }</p>
              <p className="tracklist__data--user">{ trackData.user.name }</p>
            </section>

        </li>
      )
    })

    return (
      <ul className="tracklist__wrapper">
      { renderTracklist }
      </ul>
    )
  }
}

PlayerTracklist.propTypes = {
  actions: PropTypes.objectOf(
    PropTypes.func.isRequired
  ),
  audio: PropTypes.object,
  trackEntity: PropTypes.object,
  trackId: PropTypes.number,
  tracklist: PropTypes.object,
  userEntity: PropTypes.object
}
