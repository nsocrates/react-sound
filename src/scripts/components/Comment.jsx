import React, { PropTypes } from 'react'
import { IMG_FALLBACK } from 'constants/ItemLists'
import LinkItem from 'components/LinkItem'

export default function Comment(props) {
  const { by, at, timestamp, avatar, body, userId } = props

  const handleImgError = e => {
    const { currentTarget } = e
    currentTarget.src = IMG_FALLBACK.AVATAR.SMALL

    return currentTarget
  }

  return (
    <div className="comment">
      <LinkItem
        className="comment__avatar avatar avatar--badge"
        to={`#user/${userId}`}
      >
        <img
          className="avatar__img"
          onError={ handleImgError }
          src={ avatar }
        />
      </LinkItem>

      <div className="comment__content">
        <p className="comment__body">{ body }</p>

        <small className="comment__group">
          <LinkItem
            className="comment__by"
            to={`#user/${userId}`}
          >
            { by }
          </LinkItem>
          <span className="comment__timestamp">{` at ${timestamp}`}</span>
        </small>

        <small className="comment__at">{ at }</small>
      </div>
    </div>
  )
}

Comment.propTypes = {
  at: PropTypes.string,
  avatar: PropTypes.string,
  body: PropTypes.string,
  by: PropTypes.string,
  onImgError: PropTypes.func,
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  userId: PropTypes.number
}
