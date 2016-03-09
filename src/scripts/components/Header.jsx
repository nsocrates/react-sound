import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {

  render() {
    const { children } = this.props
    return (
      <header className="header">
        <div className="header__container">

          <ul className="header__section header__section--left">
            <li className="header__item">
              <i className="header__icon fa fa-music" />
            </li>

            <li className="header__item">
              <Link className="header__link" to="/">{ "ReactSound" }</Link>
            </li>
          </ul>

          <ul className="header__section header__section--right">
            <li className="header__item">
              <button className="btn">
                <img className="sc sc--connect" />
              </button>
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
