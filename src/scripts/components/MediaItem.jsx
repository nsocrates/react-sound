import React, { PropTypes } from 'react'

export default function MediaItem(props) {
  const { listClassName, linkClassName, iconClassName, href } = props

  return (
    <li className={ listClassName }>
      <a className={ linkClassName } href={ href }>
        <i className={ iconClassName } />
      </a>
    </li>
  )
}

MediaItem.propTypes = {
  href: PropTypes.string,
  iconClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  listClassName: PropTypes.string
}
