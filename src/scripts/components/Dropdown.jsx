import React, { PropTypes } from 'react'
import LinkItem from 'components/LinkItem'

export default function Dropdown({
  handleAuth,
  handleDropdown,
  myAvatar,
  myId,
  myName,
  onImgErr = () => {}
}) {
  const dropdownLinks = [{
    icon: 'user',
    text: 'Public Profile',
    to: '#me'
  }, {
    isDivider: true
  }, {
    icon: 'th-large',
    text: 'Collection',
    to: '#me/collection'
  }, {
    icon: 'caret-square-o-right',
    text: 'Tracks',
    to: '#me/collection/tracks'
  }, {
    icon: 'list',
    text: 'Playlists',
    to: '#me/collection/playlists'
  }, {
    icon: 'heart',
    text: 'Favorites',
    to: '#me/collection/favorites'
  }]

  const mapDropdownLinks = dropdownLinks.map(item => {
    if (item.isDivider) {
      return (
        <li className="dropdown__divider" key={`${myId}_${item.text}`} />
      )
    }

    const { icon, text, to } = item
    return (
      <li
        className="dropdown__item dropdown__item--stateful"
        key={ item.text }
      >
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

        <li className="dropdown__item dropdown__item--greeting">
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

        <li className="dropdown__item dropdown__item--stateful">
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
  handleAuth: PropTypes.func.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  myAvatar: PropTypes.string.isRequired,
  myId: PropTypes.number.isRequired,
  myName: PropTypes.string.isRequired,
  onImgErr: PropTypes.func
}
