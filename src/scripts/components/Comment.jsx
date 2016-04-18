import React, { PropTypes } from 'react'
import { FALLBACK } from 'constants/ImageConstants'
import LinkItem from 'components/LinkItem'
import CommentBody from 'components/CommentBody'
import classNames from 'classnames'

export default function Comment(props) {
  const { by, at, timestamp, avatar, body, userId, index } = props

  const isEven = classNames('comment', {
    'comment--even': index % 2 === 0
  })

  const handleImgError = e => {
    const { currentTarget } = e
    return (currentTarget.src = FALLBACK.AVATAR.SMALL)
  }

  return (
    <div className={ isEven }>
      <LinkItem
        className="comment__avatar avatar avatar--badge"
        to={`/user/${userId}`}
      >
        <img
          className="avatar__img"
          onError={ handleImgError }
          src={ avatar }
        />
      </LinkItem>

      <div className="comment__content">
        <CommentBody body={ body } />
        <small className="comment__group">
          <LinkItem
            className="link link--comment link--unvisited comment__by"
            to={`/user/${userId}`}
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
  index: PropTypes.number,
  onImgError: PropTypes.func,
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  userId: PropTypes.number
}
