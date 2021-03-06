import React, { PropTypes } from 'react'

export default function WebIcon(props) {
  const {
    itemClassName,
    linkClassName,
    iconClassName,
    href,
    text,
    textClassName
} = props

  return (
    <li className={ itemClassName }>
      <a className={ linkClassName } href={ href } target="_blank">
        <i className={ iconClassName } />
        <span className={ textClassName }>
          { text }
        </span>
      </a>
    </li>
  )
}

WebIcon.propTypes = {
  href: PropTypes.string,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  text: PropTypes.string,
  textClassName: PropTypes.string
}
