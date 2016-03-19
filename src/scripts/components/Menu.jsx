import React, { PropTypes } from 'react'
import classNames from 'classnames'

export default function Menu(props) {
  const {
    children,
    isSticky = false,
    outerClassName = '',
    innerClassName = ''
  } = props
  const shouldStick = classNames(`menu ${outerClassName}`, {
    'menu--sticky': isSticky
  })

  return (
    <nav className={ shouldStick }>
      <ul className={ `menu__inner ${innerClassName}` }>
        { children }
      </ul>
    </nav>
  )
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  innerClassName: PropTypes.string,
  isSticky: PropTypes.bool,
  outerClassName: PropTypes.string
}
