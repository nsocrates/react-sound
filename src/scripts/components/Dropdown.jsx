import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function Dropdown({
  handleAuth = () => {},
  handleDropdown = () => {},
  myAvatar = '',
  myId = 0,
  myName = 'User',
  onImgErr = () => {}
}) {
  const dropdownLinks = [{
    icon: 'user',
    text: 'Profile',
    to: '#me'
  }, {
    icon: 'caret-square-o-right',
    text: 'Tracks',
    to: '#me/tracks'
  }, {
    icon: 'list',
    text: 'Playlists',
    to: '#me/playlists'
  }, {
    icon: 'heart',
    text: 'Favorites',
    to: '#me/favorites'
  }]

  const mapDropdownLinks = dropdownLinks.map((item, index) => {
    const { icon, text, to } = item
    return (
      <li className="dropdown__item" key={`${myId}${index}`}>
        <LinkItem className="dropdown__content" to={ to }>
          <i className={`dropdown__icon fa fa-${icon}`} />
          <span className="dropdown__inline">
            { text }
          </span>
        </LinkItem>
      </li>
    )
  })

  return (
    <div className="dropdown">
      <aside
        className="dropdown__overlay"
        onClick={ handleDropdown }
      />
      <ul className="dropdown__list">

        <li className="dropdown__greeting">
          <img
            className="dropdown__avatar"
            onError={ onImgErr }
            src={ myAvatar }
          />
          <label className="dropdown__inline">
            {`Hello, ${myName}`}
          </label>
        </li>

        <li className="dropdown__divider" />

        { mapDropdownLinks }

        <li className="dropdown__divider" />

        <li className="dropdown__item">
          <button className="dropdown__content" onClick={ handleAuth }>
            <i className="dropdown__icon dropdown__icon--soundcloud fa fa-soundcloud" />
            <span className="dropdown__inline dropdown__inline--divider">
              {"|"}
            </span>
            <span className="dropdown__inline">
              {"Disconnect"}
            </span>
          </button>
        </li>

      </ul>
    </div>
  )
}

Dropdown.propTypes = {
  handleAuth: PropTypes.func,
  handleDropdown: PropTypes.func,
  myAvatar: PropTypes.string,
  myId: PropTypes.number,
  myName: PropTypes.string,
  onImgErr: PropTypes.func
}
