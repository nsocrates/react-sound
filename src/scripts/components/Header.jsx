import React from 'react'
import LinkItem from 'components/LinkItem'
import Dropdown from 'components/Dropdown'

import classNames from 'classnames'
import { formatCover } from 'utils/formatUtils'
import { FALLBACK } from 'constants/ImageConstants'

export default function Header({
  user = {},
  children = null,
  handleAuth = () => {},
  handleDropdown = () => {},
  dropdown = {},
  me = {}
}) {
  const homePath = user.isAuthenticated
    ? { pathname: '/me/stream' }
    : {
      pathname: '/genre',
      query: {
        q: 'Trance'
      }
    }

  const myName = me.first_name || me.username
  const myAvatar = Object.keys(me).length ? formatCover(me.avatar_url).badge : ''
  const shouldStack = classNames('header__item', {
    'header__item--stack': dropdown.isOpen
  })

  const handleImgError = e => {
    const { currentTarget } = e
    return (currentTarget.src = FALLBACK.AVATAR.SMALL)
  }

  const renderUnauthSection = () => {
    if (user.isAuthenticating) {
      return (
        <ul className="header__section header__section--right">
          <li className="header__item">
            <i className="header__loader fa fa-circle-o-notch fa-spin" />
          </li>
        </ul>
      )
    }

    return (
      <ul className="header__section header__section--right">
        <li className="header__item">
          <button
            className="header__btn"
            onClick={ handleAuth }
          >
            <img className="sc sc--connect" />
          </button>
        </li>
      </ul>
    )
  }

  const renderAuthSection = () => (
    <ul className="header__section header__section--right">

      <li className={ shouldStack }>
        <button
          className="header__item--right header__btn header__btn--settings"
          onClick={ handleDropdown }
        >
          <i className="header__pair fa fa-cog" />
          <i className="header__pair fa fa-caret-down" />
        </button>
      </li>

    </ul>
  )

  return (
    <header className="header">
      <div className="header__container">

        <ul className="header__section header__section--left">
          <li className="header__item">
            <i className="header__item--left fa fa-music" />
          </li>

          <li className="header__item">
            <LinkItem className="header__link" to={ homePath }>{ "ReactSound" }</LinkItem>
          </li>
        </ul>

        { user.isAuthenticated ? renderAuthSection() : renderUnauthSection() }
        { dropdown.isOpen && user.isAuthenticated &&
          <Dropdown
            handleAuth={ handleAuth }
            handleDropdown={ handleDropdown }
            isOpen={ dropdown.isOpen }
            myAvatar={ myAvatar }
            myId={ me.id }
            myName={ myName }
            onImgErr={ handleImgError }
          />
        }

      </div>
      { children }
    </header>
  )
}

Header.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.node,
  dropdown: React.PropTypes.object,
  handleAuth: React.PropTypes.func,
  handleDropdown: React.PropTypes.func,
  me: React.PropTypes.object
}
