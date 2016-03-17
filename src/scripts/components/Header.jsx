import React from 'react'
import LinkItem from 'components/LinkItem'
import Dropdown from 'components/Dropdown'

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

  const renderAuthSection = () => {
    const myAvatar = Object.keys(me).length ? getCover(me.avatar_url) : null
    return (
      <ul className="header__section header__section--right">

        <li className="header__item">
          <label className="header__item--right header__greeting">
            {`Hello, ${myName}`}
          </label>
        </li>

        <li className="header__item">
          <LinkItem
            className="header__item--right header__avatar avatar avatar--badge"
            to={`#user/${me.id}`}
          >
            <img
              className="avatar__img"
              onError={ handleImgError }
              src={ myAvatar.badge }
            />
          </LinkItem>
        </li>

        <li className="header__item">
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
  }

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

        { auth.isAuthorized ? renderAuthSection() : renderConnectBtn() }
        { auth.isAuthorized
          ? <Dropdown
            handleAuth={ handleAuth }
            isOpen={ dropdown.isOpen }
            myId={ me.id }
            myName={ myName }
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
