import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LinkItem from 'components/LinkItem'

export default function Dropdown({ handleAuth = () => {}, isOpen = false, myId = 0 }) {
  const shouldOpen = classNames('dropdown', {
    'dropdown--isOpen': isOpen
  })
  return (
    <ul className={ shouldOpen }>

      <li className="dropdown__item">
        <LinkItem className="dropdown__link" to={`#user/${myId}`}>
          {"View Profile"}
        </LinkItem>
      </li>

      <li className="dropdown__item">
        <button className="dropdown__btn" onClick={ handleAuth }>
          <i className="dropdown__icon fa fa-soundcloud" />
          <span className="dropdown__divider">{"|"}</span>
          <span>{"Disconnect"}</span>
        </button>
      </li>

    </ul>
  )
}

Dropdown.propTypes = {
  handleAuth: PropTypes.func,
  isOpen: PropTypes.bool,
  myId: PropTypes.number
}
