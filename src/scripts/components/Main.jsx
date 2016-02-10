import React from 'react'

const Main = ({ children = null, className }) => (
  <main
    className={ className }
    id="main"
  >
    { children }
  </main>
)

Main.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
}

Main.defaultProps = {
  children: null,
  className: 'main'
}

export default Main
