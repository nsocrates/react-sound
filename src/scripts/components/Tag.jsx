import React, { PropTypes } from 'react'

export default function Tag(props) {
  const { text, href } = props
  return (
    <li className="tag">
      <a className="tag__item" href={ href }>
        <span className="tag__text">{ text }</span>
      </a>
    </li>
  )
}

Tag.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
}

Tag.defaultProps = {
  href: '#',
  text: null
}
