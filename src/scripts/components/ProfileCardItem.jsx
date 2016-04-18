import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'
import { FALLBACK } from 'constants/ImageConstants'

export default function ProfileCardItem(props) {
  const {
    avatar,
    fullname,
    username,
    location,
    isFollowing,
    onClickFollow,
    profilePath
  } = props

  const shouldFollow = classNames('p-card__btn btn btn--md', {
    'btn__follow btn__follow--light': !isFollowing,
    'btn__following btn__following--light': isFollowing
  })

  const handleError = e => {
    const { currentTarget } = e
    const { fallback = FALLBACK.AVATAR.LARGE } = props
    return (currentTarget.src = fallback)
  }

  return (
    <article className="p-card__item">
      <section className="p-card__body">

        <section className="p-card__cover">
          <LinkItem
            className="p-card__cover--link"
            to={ profilePath }
          >
            <img
              className="p-card__cover--img"
              onError={ handleError }
              src={ avatar }
            />
          </LinkItem>
        </section>

        <section className="p-card__content">
          <LinkItem to={ profilePath }>
            <h5 className="p-card__username">
              { username }
            </h5>
          </LinkItem>
          <h6 className="p-card__fullname">
            <small>{ fullname }</small>
          </h6>
          <h6 className="p-card__location">
            <small>{ location }</small>
          </h6>
          <div className="p-card__btn-wrap">
            <button
              className={ shouldFollow }
              onClick={ onClickFollow }
            />
          </div>
        </section>

      </section>
    </article>
  )
}

ProfileCardItem.propTypes = {
  avatar: PropTypes.string,
  fallback: PropTypes.string,
  fullname: PropTypes.string,
  isFollowing: PropTypes.bool,
  location: PropTypes.string,
  onClickFollow: PropTypes.func,
  profilePath: PropTypes.string,
  username: PropTypes.string
}
