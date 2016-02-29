import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function Tag(props) {
  const { text, modifier } = props
  const location = {
    pathname: '#tag',
    query: {
      q: text
    }
  }

  return (
    <li className={`tag tag--${modifier}`}>
      <LinkItem
        className={`tag__item tag__item--${modifier}`}
        location={ location }
        to="#tag"
      >
        <div className={`tag__text tag__text--${modifier}`}>{ text }</div>
      </LinkItem>
    </li>
  )
}

Tag.propTypes = {
  modifier: PropTypes.string,
  text: PropTypes.string.isRequired
}

Tag.defaultProps = {
  modifier: 'card'
}
