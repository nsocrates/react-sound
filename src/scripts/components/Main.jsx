import React from 'react'
import classNames from 'classnames'

export default function Main({ children = null, className = null, shouldPush = false }) {
  const push = classNames(`main ${className}`, {
    'main--push': shouldPush
  })

  return (
    <main
      className={ push }
      id="main"
    >
      { children }
    </main>
  )
}

Main.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default Main
