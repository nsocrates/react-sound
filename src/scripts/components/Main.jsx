import React from 'react'
import classNames from 'classnames'

export default function Main({ children = null, className = 'main', shouldPush = false }) {
  const push = classNames(className, {
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
  className: React.PropTypes.string,
  shouldPush: React.PropTypes.bool
}

export default Main
