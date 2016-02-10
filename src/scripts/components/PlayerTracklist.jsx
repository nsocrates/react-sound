import React, { PropTypes } from 'react'
import { IMG_FORMAT } from 'constants/ItemLists'
import { trackFactory } from 'utils/Utils'
import classNames from 'classnames'
import Button from './Button'

export default class PlayerTracklist extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlayPause = this.handlePlayPause.bind(this)
  }

  handlePlayPause(id) {
    const audio = document.getElementById('audio')
    const { actions, trackId, audio: { isPlaying }} = this.props
    const isCurrentTrack = trackId === id
    if (isCurrentTrack) {
      return isPlaying ? audio.pause() : audio.play()
    }

    actions.requestStream(id)
  }

  render() {
    const { tracklist, userEntity, trackEntity, trackId, audio: { isPlaying }} = this.props
    const renderTracklist = tracklist.ids.map((id, index) => {
      const obj = { userEntity, trackEntity, trackId: id }
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

      const isCurrentTrack = trackId === id
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
              src={ trackData.getArtwork(IMG_FORMAT.BADGE) }
            />
          </aside>

          <div className="tracklist__data">
            <p className="tracklist__data--title">{ trackData.track.name }</p>
            <p className="tracklist__data--user">{ trackData.user.name }</p>
          </div>
          <div className="tracklist__icons">
            { shouldRenderDownload() }
            <Button
              btnClass="tracklist__btn"
              onBtnClick={ this.handlePlayPause.bind(this, id) }
            >
              <i className={ isPauseOrPlay } />
            </Button>

            <Button btnClass="tracklist__btn tracklist__btn--heart">
              <i className="tracklist__icon tracklist__icon--heart fa fa-heart-o" />
            </Button>
          </div>
        </li>
      )
    })

    return (
      <ul className="tracklist__wrapper">
        { renderTracklist.reverse() }
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
