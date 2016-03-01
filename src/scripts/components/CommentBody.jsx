import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function CommentBody({ body }) {
  const reAtSound = /@([\w\-]+\w)/i

  if (reAtSound.test(body)) {
    const atSound = body.match(reAtSound)
    const textSplit = body.split(atSound[0])

    return (
      <p className="comment__body">
        <LinkItem className="link link--unvisited" to={`#user/${atSound[1]}`}>{ atSound[0] }</LinkItem>
        { textSplit[1] }
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
