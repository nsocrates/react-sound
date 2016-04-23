import React from 'react'
import LinkItem from 'components/LinkItem'
import { FALLBACK } from 'constants/ImageConstants'

export default function Gallery(props) {
  const {
    onRequestStream = () => {},
    trackData: { user, media, artwork }
  } = props

  const handleError = e => {
    const { currentTarget } = e
    return (currentTarget.src = FALLBACK.PLACEHOLDER_LARGE)
  }

  return (
    <article className="gallery">
      <section className="artwork gallery__artwork">
        <img
          className="gallery__artwork--img"
          onError={ handleError }
          src={ artwork.large }
        />
        <button
          className="fa artwork__filter"
          onClick={ onRequestStream }
        />
      </section>
      <section className="gallery__content">
        <h6 className="gallery__content--title" >
          <LinkItem
            className="gallery__content--link"
            to={`/track/${media.id}`}
          >
            { media.name }
          </LinkItem>
        </h6>
        <h6 className="gallery__content--byline">
          <LinkItem
            className="gallery__content--link"
            to={`/user/${user.id}`}
          >
            { user.name }
          </LinkItem>
        </h6>
      </section>
    </article>
  )
}

Gallery.propTypes = {
  onRequestStream: React.PropTypes.func,
  trackData: React.PropTypes.object.isRequired
}
