import React from 'react'

const Main = ({ children = null }) => (
  <main
    className="main"
    id="main"
  >
    <div className="container">
      { children }
    </div>
  </main>
)

Main.propTypes = {
  children: React.PropTypes.node
}

export default Main
