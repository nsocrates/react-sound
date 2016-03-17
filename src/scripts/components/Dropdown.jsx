import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'

export default function Dropdown({
  handleAuth = () => {},
  isOpen = false,
  myId = 0,
  myName = 'User'
}) {
  const shouldOpen = classNames('dropdown', {
    'dropdown--isOpen': isOpen
  })
  return (
    <div className={ shouldOpen }>
      <ul className="dropdown__list">

        <li className="dropdown__greeting">
          <label className="dropdown__inline">
            {`Hello, ${myName}`}
          </label>
        </li>

        <li className="dropdown__item">
          <LinkItem className="dropdown__content" to={`#user/${myId}`}>
            <span className="dropdown__inline">
              {"View Profile"}
            </span>
          </LinkItem>
        </li>

        <li className="dropdown__item">
          <button className="dropdown__content" onClick={ handleAuth }>
            <i className="dropdown__inline dropdown__inline--icon fa fa-soundcloud" />
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
  isOpen: PropTypes.bool,
  myId: PropTypes.number,
  myName: PropTypes.string
}
