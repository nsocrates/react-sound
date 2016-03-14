import React, { PropTypes } from 'react'

export default function Notification(props) {
  const { body, kind, onClick } = props

  return (
    <li
      className={`notif__item notif__item--${kind}`}
      onClick={ onClick }
    >
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
  kind: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
