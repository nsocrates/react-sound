import React from 'react'

const Main = ({ children = null, className = null }) => (
  <main
    className={`main ${className}`}
    id="main"
  >
    { children }
  </main>
)

Main.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

export default Main
