import React from 'react'

const Main = ({ children = null }) => (
  <main
    className="main"
    id="main"
  >
    <div className="main__container">
      { children }
    </div>
  </main>
)

Main.propTypes = {
  children: React.PropTypes.node
}

export default Main
