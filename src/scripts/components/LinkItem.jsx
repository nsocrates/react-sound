import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function LinkItem(props) {
  const { children, className, to, onClick } = props

  return (
    <Link
      className={ className }
      onClick={ onClick }
      to={ to }
    >
      { children }
    </Link>
  )
}

LinkItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string
}

LinkItem.defaultProps = {
  children: null,
  className: null,
  onClick() {},
  to: '#'
}
