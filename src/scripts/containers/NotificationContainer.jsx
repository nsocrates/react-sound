import React from 'react'
import Notification from 'components/Notification'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { destroyNotif } from 'actions/notification'
import { connect } from 'react-redux'

function NotificationContainer(props) {
  const { dispatch, notifications } = props
  const ReactCSSTransitionNames = {
    enter: 'enter',
    leave: 'leave'
  }

  const priorityList = notifications.filter(notif => (
    notif.priority
  ))

  const priorityItem = () => {
    const [notif] = priorityList
    const { id, body, kind, icon } = notif
    const handleDestroyNotif = () => (
      dispatch(destroyNotif(id))
    )

    return (
      <Notification
        body={ body }
        icon={ icon }
        key={ id }
        kind={ kind }
        onClick={ handleDestroyNotif }
      />
    )
  }

  const notifItems = notifications.map(notif => {
    const { id, body, kind, icon } = notif
    const handleDestroyNotif = () => (
      dispatch(destroyNotif(id))
    )

    return (
      <Notification
        body={ body }
        icon={ icon }
        key={ id }
        kind={ kind }
        onClick={ handleDestroyNotif }
      />
    )
  })

  return (
    <ReactCSSTransitionGroup
      className="notifs"
      component = "ul"
      transitionEnterTimeout = { 300 }
      transitionLeaveTimeout = { 300 }
      transitionName = { ReactCSSTransitionNames }
    >
      { priorityList[0] ? priorityItem() : notifItems }
    </ReactCSSTransitionGroup>
  )
}

NotificationContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  notifications: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { notifications } = state.app.ui

  return {
    notifications
  }
}

export default connect(mapStateToProps)(NotificationContainer)
