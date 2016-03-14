import React from 'react'
import LinkItem from 'components/LinkItem'
import classNames from 'classnames'

export default function Header({
  children = null,
  handleAuth = () => ({}),
  isAuthorized = false
}) {
  const scButton = classNames('sc', {
    'sc--connect': !isAuthorized,
    'sc--disconnect': isAuthorized
  })
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
            <button
              className="btn"
              onClick={ handleAuth }
            >
              <img className={ scButton } />
            </button>
          </li>
        </ul>

      </div>
      { children }
    </header>
  )
}

Header.propTypes = {
  children: React.PropTypes.node,
  isAuthorized: React.PropTypes.bool,
  handleAuth: React.PropTypes.func
}
