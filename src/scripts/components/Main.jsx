import React from 'react'

const Main = ({ children }) => (
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
  children: React.PropTypes.node.isRequired
}

export default Main
