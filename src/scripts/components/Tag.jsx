import React, { PropTypes } from 'react'

export default function Tag(props) {
  const { text, href, modifier } = props
  return (
    <li className={`tag tag--${modifier}`}>
      <a className={`tag__item tag__item--${modifier}`} href={ href }>
        <div className={`tag__text tag__text--${modifier}`}>{ text }</div>
      </a>
    </li>
  )
}

Tag.propTypes = {
  href: PropTypes.string,
  modifier: PropTypes.string,
  text: PropTypes.string.isRequired
}

Tag.defaultProps = {
  href: '#',
  modifier: 'card'
}
