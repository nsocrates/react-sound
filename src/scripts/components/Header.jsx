import React from 'react'

export default class Header extends React.Component {

  render() {
    const { children } = this.props
    return (
      <header className="header">
        <div className="container">
          <ul className="header-section">
            <li className="logo">
              <i className="fa fa-music" />
            </li>
            <li className="title">
              <a href="#">{ "reactSOUND" }</a>
            </li>
          </ul>
          <ul className="header-section">
            <li className="login">
              <a href="#">
                <i className="fa fa-user" />
              </a>
            </li>
          </ul>
        </div>
        { children }
      </header>
    )
  }
}

Header.propTypes = {
  children: React.PropTypes.node
}

Header.defaultProps = {
  children: null
}
