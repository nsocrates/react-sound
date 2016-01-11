import React from 'react'

export default class Main extends React.Component {
  render() {
    return (
      <main
        className="main"
        id="main"
      >
        <div className="container">
          { this.props.children }
        </div>
      </main>
    )
  }
}

Main.propTypes = {
  children: React.PropTypes.node.isRequired
}
