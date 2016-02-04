import React from 'react'
import { IMG_FALLBACK } from 'constants/ItemLists'

export default class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleClick(e) {
    const { actions, trackId, streamTrackId, audioIsPlaying } = this.props
    const audio = document.getElementById('audio')
    e.preventDefault()

    if (trackId === streamTrackId) {
      return audioIsPlaying ? audio.pause() : audio.play()
    }

    return actions.requestStream(trackId)
  }

  handleError(e) {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.ERROR_LARGE

    return currentTarget
  }

  render() {
    const { className, style, title, user, imgUrl } = this.props

    return (
      <div className={ className }>
        <a
          className="fa gallery__artwork"
          href=""
          onClick={ this.handleClick }
          style={ style }
        >
          <img
            className="gallery__artwork--img"
            onError={ this.handleError }
            src={ imgUrl }
          />
        </a>
        <div className="gallery__track">
          <h6 className="gallery__track--title">{ title }</h6>
          <h6 className="gallery__track--user">{ user }</h6>
        </div>
      </div>
    )
  }
}

Gallery.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string,
  imgUrl: React.PropTypes.string,
  streamTrackId: React.PropTypes.number,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  title: React.PropTypes.string,
  trackId: React.PropTypes.number,
  user: React.PropTypes.string
}

Gallery.defaultProps = {
  className: null,
  imgUrl: null,
  style: null,
  title: 'Track Title',
  trackId: null,
  user: 'Track User'
}
