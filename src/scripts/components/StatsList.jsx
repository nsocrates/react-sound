import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'
import { kFormatter } from 'utils/formatUtils'

export default function StatsList({ listItems, pathname, hashTags = [] }) {
  const items = listItems.map(item => {
    if (item.text) {
      return (
        <li
          className="stats__list-item"
          key={`${item.text}`}
        >
          { item.text }
        </li>
      )
    }

    return (
      <li
        className="stats__list-item"
        key={`${item.icon}_${item.value}`}
      >
        <i className={`stats__icon fa fa-${item.icon}`} />
        { kFormatter(item.value) }
      </li>
    )
  })

  const tags = hashTags.map((tag, index) => {
    const location = {
      pathname,
      query: {
        q: tag
      }
    }

    return (
      <li
        className="stats__list-item"
        key={`${tag}_${index}`}
      >
        <LinkItem
          className="stats__link stats__link--hashtag"
          to={ location }
        >
          <i className="stats__icon fa fa-hashtag" />
          { tag }
        </LinkItem>
      </li>
    )
  })

  return (
    <ul className="stats">
      { items }
      { tags }
    </ul>
  )
}

StatsList.propTypes = {
  listItems: PropTypes.array.isRequired,
  hashTags: PropTypes.array,
  pathname: PropTypes.string
}
