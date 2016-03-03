import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'
import { kFormatter } from 'utils/Utils'

export default function StatsList({ listItems, pathname, hashTags = [] }) {
  const items = listItems.map((item, index) => {
    if (item.text) {
      return (
        <li
          className="stats__list-item"
          key={`list-item__${index}`}
        >
          { item.text }
        </li>
      )
    }

    return (
      <li
        className="stats__list-item"
        key={`list-item__${index}`}
      >
        <i className={`stats__icon ${item.icon}`} />
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
        key={`hashtag__${index}_${tag}`}
      >
        <LinkItem
          className="stats__link stats__link--hashtag"
          location={ location }
          to={ "#genre" }
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
