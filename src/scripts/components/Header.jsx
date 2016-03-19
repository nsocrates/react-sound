import React from 'react'
import LinkItem from 'components/LinkItem'
import Dropdown from 'components/Dropdown'

import classNames from 'classnames'
import { getCover } from 'utils/Utils'
import { IMG_FALLBACK } from 'constants/ItemLists'

export default function Header({
  auth = {},
  children = null,
  handleAuth = () => {},
  handleDropdown = () => {},
  dropdown = {},
  me = {}
}) {
  const myName = me.first_name || me.username
  const myAvatar = Object.keys(me).length ? getCover(me.avatar_url) : {}

  const shouldStack = classNames('header__item', {
    'header__item--stack': dropdown.isOpen
  })

  const handleImgError = e => {
    const { currentTarget } = e
    return (currentTarget.src = IMG_FALLBACK.AVATAR.SMALL)
  }

  const renderConnectBtn = () => (
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
            <LinkItem className="header__link" to="/">{ "ReactSound" }</LinkItem>
          </li>
        </ul>

        { auth.result.isAuthorized ? renderAuthSection() : renderConnectBtn() }
        { dropdown.isOpen && auth.result.isAuthorized
          ? <Dropdown
            handleAuth={ handleAuth }
            handleDropdown={ handleDropdown }
            isOpen={ dropdown.isOpen }
            myAvatar={ myAvatar.small }
            myId={ me.id }
            myName={ myName }
            onImgErr={ handleImgError }
          />
          : null }

      </div>
      { children }
    </header>
  )
}

Header.propTypes = {
  auth: React.PropTypes.object,
  children: React.PropTypes.node,
  dropdown: React.PropTypes.object,
  handleAuth: React.PropTypes.func,
  handleDropdown: React.PropTypes.func,
  me: React.PropTypes.object
}
