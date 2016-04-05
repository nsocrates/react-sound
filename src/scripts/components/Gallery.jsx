import React from 'react'
import LinkItem from 'components/LinkItem'
import { FALLBACK } from 'constants/ImageConstants'

export default function Gallery(props) {
  const {
    actions,
    streamTrackId,
    audioIsPlaying,
    trackData: { user, media, artwork }
  } = props

  const handleClick = e => {
    const audio = document.getElementById('audio')
    e.preventDefault()

    if (media.id === streamTrackId) {
      return audioIsPlaying ? audio.pause() : audio.play()
    }

    return actions.requestStream(media.id)
  }

  const handleError = e => {
    const { currentTarget } = e
    currentTarget.src = FALLBACK.PLACEHOLDER_LARGE

    return currentTarget
  }

  return (
    <article className="gallery">
      <a
        className="fa artwork gallery__artwork"
        href=""
        onClick={ handleClick }
      >
        <img
          className="gallery__artwork--img"
          onError={ handleError }
          src={ artwork.large }
        />
      </a>
      <div className="gallery__content">
        <h6 className="gallery__content--title" >
          <LinkItem
            className="gallery__content--link"
            to={`#track/${media.id}`}
          >
            { media.name }
          </LinkItem>
        </h6>
        <h6 className="gallery__content--byline">
          <LinkItem
            className="gallery__content--link"
            to={`#user/${user.id}`}
          >
            { user.name }
          </LinkItem>
        </h6>
      </div>
    </article>
  )
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
