import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { IMG_FALLBACK } from 'constants/ItemLists'
import { REQ } from 'constants/Auth'

import { getCover } from 'utils/Utils'

import { updateMyFollowings } from 'actions/auth'

import End from 'components/End'
import LinkItem from 'components/LinkItem'

export default function ContactList(props) {
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
    return (currentTarget.src = IMG_FALLBACK.AVATAR.SMALL)
  }

  const contactItems = ids.map((id, index) => {
    const user = userEntity[id]
    const username = user.username
    const avatar = getCover(user.avatar_url).badge

    const handleFollow = e => {
      e.preventDefault()

      if (userCollection.ids.indexOf(id) !== -1) {
        return dispatch(updateMyFollowings(REQ.DEL, id, username))
      }
      return dispatch(updateMyFollowings(REQ.PUT, id, username))
    }

    return (
      <li className="contact" key={`${id}${index}`}>

        <LinkItem
          className="contact__avatar avatar avatar--badge"
          to={`#user/${id}`}
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
              to={`#user/${id}`}
            >
              { username }
            </LinkItem>
          </p>
        </div>

        <div className="contact__action">
          <button
            className="btn btn--md btn__follow btn__follow--light"
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
