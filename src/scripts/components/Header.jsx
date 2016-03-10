import React from 'react'
import LinkItem from 'components/LinkItem'

export default function Header({ children = null }) {
  return (
    <header className="header">
      <div className="header__container">

        <ul className="header__section header__section--left">
          <li className="header__item">
            <i className="header__icon fa fa-music" />
          </li>

          <li className="header__item">
            <LinkItem className="header__link" to="/">{ "ReactSound" }</LinkItem>
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

Header.propTypes = {
  children: React.PropTypes.node
}
