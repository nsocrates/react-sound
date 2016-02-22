import React from 'react'
import { Link } from 'react-router'
import { IMG_FALLBACK } from 'constants/ItemLists'

export default class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick_artwork = this.handleClick_artwork.bind(this)
    this.handleError_img = this.handleError_img.bind(this)
    this.handleClick_user = this.handleClick_user.bind(this)
    this.handleClick_track = this.handleClick_track.bind(this)
  }

  handleClick_artwork(e) {
    const { actions, streamTrackId, audioIsPlaying, trackData: { media }} = this.props
    const audio = document.getElementById('audio')
    e.preventDefault()

    if (media.id === streamTrackId) {
      return audioIsPlaying ? audio.pause() : audio.play()
    }

    return actions.requestStream(media.id)
  }

  handleClick_user(e) {
    e.preventDefault()
    const { actions, trackData: { user }} = this.props
    const location = {
      pathname: `#user/${user.id}`
    }

    actions.push(location)
  }

  handleClick_track(e) {
    e.preventDefault()
    const { actions, trackData: { media }} = this.props

    console.log('track_id:', media.id)
  }

  handleError_img(e) {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.PLACEHOLDER_LARGE

    return currentTarget
  }

  render() {
    const { trackData: { user, media, artwork }} = this.props

    return (
      <article className="gallery">
        <a
          className="fa artwork gallery__artwork"
          href=""
          onClick={ this.handleClick_artwork }
        >
          <img
            className="gallery__artwork--img"
            onError={ this.handleError_img }
            src={ artwork.large }
          />
        </a>
        <div className="gallery__content">
          <h6 className="gallery__content--title" >
            <a
              className="gallery__content--link"
              href="#"
              onClick={ this.handleClick_track }
            >
              { media.name }
            </a>
          </h6>
          <h6 className="gallery__content--byline">
            <Link
              className="gallery__content--link"
              onClick={ this.handleClick_user }
              to={`#user/${user.id}`}
            >
              { user.name }
            </Link>
          </h6>
        </div>
      </article>
    )
  }
}

Gallery.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool.isRequired,
  imgUrl: React.PropTypes.string,
  streamTrackId: React.PropTypes.number,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  title: React.PropTypes.string,
  trackData: React.PropTypes.object,
  user: React.PropTypes.string
}

Gallery.defaultProps = {
  imgUrl: null,
  style: null,
  title: 'Track Title',
  trackId: null,
  user: 'Track User'
}
