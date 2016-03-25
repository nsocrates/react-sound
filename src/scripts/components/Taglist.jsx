import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function Taglist(props) {
  const {
    tags,
    max = undefined,
    modifier = 'card'
  } = props

  if (!tags.length) {
    return <noscript />
  }

  const tagItems = tags.slice(0, max).map((tag, index) => {
    const location = {
      pathname: '#tag',
      query: {
        q: tag
      }
    }

    return (
      <li
        className={`tag tag--${modifier}`}
        key={`tag__${index}_${tag}`}
      >
        <LinkItem
          className={`tag__item tag__item--${modifier}`}
          location={ location }
          to="#tag"
        >
          <div className={`tag__text tag__text--${modifier}`}>
            { tag }
          </div>
        </LinkItem>
      </li>
    )
  })

  return (
    <ul className={`tags tags--${modifier}`}>
      { tagItems }
    </ul>
  )
}

Taglist.propTypes = {
  max: PropTypes.number,
  modifier: PropTypes.string,
  tags: PropTypes.array.isRequired
}
