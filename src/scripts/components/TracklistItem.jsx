import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function TracklistItem(props) {
  const {
    downloadUrl,
    handleAddToFavorites,
    handlePlayPause,
    isActive,
    isFavorite,
    isPauseOrPlay,
    isSoundCloud,
    modifier,
    shouldFilter,
    trackArtwork,
    trackId,
    trackName,
    userId,
    userName,
    duration = undefined
  } = props

  const shouldRenderDownload = () => {
    if (!downloadUrl) {
      return null
    }

    return (
      <button className={`tracklist-${modifier}__btn`}>
        <a href={ downloadUrl }>
          <i className={`tracklist-${modifier}__icon fa fa-download`} />
        </a>
      </button>
    )
  }

  return (
    <li className={ isActive } >

      <aside className={ shouldFilter }>
        <img
          className="tracklist__img"
          src={ trackArtwork }
        />
      </aside>

        <section className={`tracklist-${modifier}__icons`}>

          { shouldRenderDownload() }

          <button
            className={ isSoundCloud }
            onClick={ handlePlayPause }
          >
            <i className={ isPauseOrPlay } />
          </button>

          <button
            className={ isFavorite }
            onClick={ handleAddToFavorites }
          >
            <i className={`tracklist-${modifier}__icon
              tracklist__icon--heart fa fa-heart-o`}
            />
          </button>

        </section>

        <section className={`tracklist-${modifier}__data`}>
          <p className={`tracklist-${modifier}__title`}>
            <LinkItem
              className="tracklist__link"
              to={`/track/${trackId}`}
            >
              { trackName }
            </LinkItem>
          </p>
          <p className={`tracklist-${modifier}__user`}>
            <LinkItem
              className="tracklist__link tracklist__link--user"
              to={`/user/${userId}`}
            >
              { userName }
            </LinkItem>
          </p>
          <p className={`tracklist-${modifier}__time`}>
            { duration }
          </p>
        </section>

    </li>
  )
}

TracklistItem.propTypes = {
  downloadUrl: PropTypes.string,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  handleAddToFavorites: PropTypes.func,
  handlePlayPause: PropTypes.func,
  isActive: PropTypes.string,
  isFavorite: PropTypes.string,
  isPauseOrPlay: PropTypes.string,
  isSoundCloud: PropTypes.string,
  modifier: PropTypes.string,
  shouldFilter: PropTypes.string,
  trackArtwork: PropTypes.string,
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string
}
