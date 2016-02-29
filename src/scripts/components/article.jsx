import React, { PropTypes } from 'react'
import { splitLines } from 'utils/Utils'

export default function Article(props) {
  const {
    article,
    wrapperClassName = '',
    missing = 'Nothing to display.',
    missingClassName = 'article__none'
  } = props

  if (!article) {
    return (
      <p className={ missingClassName }>
        { missing }
      </p>
    )
  }

  const paragraphs = splitLines(article).map((item, index) => {
    const reAtSound = /@([\w\-]+\w)/i
    const reAtMail = /(\S+@\S+\.\S+)/i
    const text = item[0]
    const link = item[1]

    if (link) {
      const hasProtocol = /http/.test(link)

      return (
        <p
          className="article__paragraph"
          key={`article--text--link_${index}`}
        >
          { text }
          <a
            className="link link--has-visit-state"
            href={ hasProtocol ? item[1] : `http://${item[1]}` }
          >
            { link }
          </a>
        </p>
      )
    }

    // Checks for SoundCloud link
    if (reAtSound.test(text)) {
      const atSound = text.match(reAtSound)
      const scUser = atSound[1]

      // If SC link is between text
      if (atSound.index > 0) {
        const textSplit = text.split(atSound[0])

        return (
          <p
            className="article__paragraph"
            key={`article--soundcloud__${index}`}
          >
            { `${textSplit[0]}@` }
            <a
              className="link link--has-visit-state"
              href={ `https://soundcloud.com/${scUser}` }
            >
              { scUser }
            </a>
            { textSplit[1] }
          </p>
        )
      }

      // Return single line SC link
      return (
        <p
          className="article__paragraph"
          key={`article--soundcloud__${index}`}
        >
          {"@"}
          <a
            className="link link--has-visit-state"
            href={ `https://soundcloud.com/${scUser}` }
          >
            { scUser }
          </a>
        </p>
      )
    }

    // Checks for mailto link
    if (reAtMail.test(text)) {
      const mail = text.match(reAtMail)[0]

      // If mailto link is between text
      if (text.length > mail.length) {
        const textSplit = text.split(mail)

        return (
          <p
            className="article__paragraph"
            key={`article--mail__${index}`}
          >
            { textSplit[0] }
            <a
              className="link link--has-visit-state"
              href={ `mailto:${mail}` }
            >
              { mail }
            </a>
            { textSplit[1] }
          </p>
        )
      }

      // Return single line mailto link
      return (
        <p
          className="article__paragraph"
          key={`article--mail__${index}`}
        >
          <a
            className="link link--has-visit-state"
            href={ `mailto:${item[0]}` }
          >
            { item[0] }
          </a>
        </p>
      )
    }

    // Return regular paragraph
    return (
      <p
        className="article__paragraph"
        key={`article--text__${index}`}
      >
        { item[0] }
      </p>
    )
  })

  return (
    <div className={ wrapperClassName }>
      { paragraphs }
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.string,
  missing: PropTypes.string,
  missingClassName: PropTypes.string,
  wrapperClassName: PropTypes.string
}
