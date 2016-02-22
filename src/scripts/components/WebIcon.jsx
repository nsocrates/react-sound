import React, { PropTypes } from 'react'

export default function WebIcon(props) {
  const { itemClassName, linkClassName, iconClassName, href } = props

  return (
    <li className={ itemClassName }>
      <a className={ linkClassName } href={ href }>
        <i className={ iconClassName } />
      </a>
    </li>
  )
}

WebIcon.propTypes = {
  href: PropTypes.string,
  iconClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  linkClassName: PropTypes.string
}
