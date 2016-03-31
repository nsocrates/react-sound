import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function CommentBody({ body }) {
  const reAtSound = /@([\w\-]+\w)/i

  if (reAtSound.test(body)) {
    const [atUser, user] = body.match(reAtSound)
    const text = body.split(atUser)[1]

    return (
      <p className="comment__body">
        <LinkItem
          className="link link--unvisited"
          to={`#user/${user}`}
        >
          { atUser }
        </LinkItem>
        { text }
      </p>
    )
  }

  return (
    <p className="comment__body">{ body }</p>
  )
}

CommentBody.propTypes = {
  body: PropTypes.string.isRequired
}
