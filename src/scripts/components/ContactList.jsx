import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { FALLBACK } from 'constants/ImageConstants'
import { formatCover } from 'utils/formatUtils'
import { updateMyFollowings } from 'actions/collection'

import End from 'components/End'
import LinkItem from 'components/LinkItem'

function ContactList(props) {
  const {
    children = null,
    className = 'contact-list',
    dispatch,
    hasLoaded = false,
    ids = [],
    userCollection = {},
    userEntity = {}
  } = props

  if (!ids.length && hasLoaded) {
    return (
      <article className="end-wrapper">
        <End className="end--bottom" text="NO ITEMS TO DISPLAY." />
      </article>
    )
  }

  const handleError = e => {
    const { currentTarget } = e
    return (currentTarget.src = FALLBACK.AVATAR.SMALL)
  }

  const contactItems = ids.map((id, index) => {
    const user = userEntity[id]
    const username = user.username
    const avatar = formatCover(user.avatar_url).badge

    const isFollowing = userCollection.ids.indexOf(id) !== -1
    const shouldFollow = classNames('contact__btn btn btn--md', {
      'btn__follow btn__follow--light': !isFollowing,
      'btn__following btn__following--light': isFollowing
    })

    const handleFollow = e => {
      e.preventDefault()
      return dispatch(updateMyFollowings(id, username))
    }

    return (
      <li className="contact" key={`${id}${index}`}>

        <LinkItem
          className="contact__avatar avatar avatar--badge"
          to={`/user/${id}`}
        >
          <img
            className="avatar__img"
            onError={ handleError }
            src={ avatar }
          />
        </LinkItem>

        <div className="contact__user">
          <p className="contact__text contact__text--username">
            <LinkItem
              className="contact__link link"
              to={`/user/${id}`}
            >
              { username }
            </LinkItem>
          </p>
        </div>

        <div className="contact__btn-wrap">
          <button
            className={ shouldFollow }
            onClick={ handleFollow }
          />
        </div>

      </li>
    )
  })

  return (
    <ul className={ className }>
      { contactItems }
      { children }
    </ul>
  )
}

ContactList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  hasLoaded: PropTypes.bool,
  ids: PropTypes.array.isRequired,
  userCollection: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired
}

export default connect()(ContactList)
