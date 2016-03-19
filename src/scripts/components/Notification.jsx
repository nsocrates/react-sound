import React, { PropTypes } from 'react'

export default function Notification(props) {
  const { body, kind, icon, onClick } = props

  const renderIcon = icon ? <img className="notif__icon" src={ icon } /> : null

  return (
    <li
      className={`notif__item notif__item--${kind}`}
      onClick={ onClick }
    >
      { renderIcon }
      <label className="notif__body">
        { body }
      </label>
      <button className="notif__btn">
        <i className="notif__icon fa fa-times" />
      </button>
    </li>
  )
}

Notification.propTypes = {
  body: PropTypes.string.isRequired,
  icon: PropTypes.string,
  kind: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
