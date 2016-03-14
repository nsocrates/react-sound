import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { toggleNavBar } from 'actions/toggle'
import { authConnect, authDisconnect } from 'actions/auth'

function HeaderContainer(props) {
  const { dispatch, auth: { request } } = props

  const handleAuth = () => (
    request.hasOwnProperty('access_token') ? dispatch(authDisconnect()) : dispatch(authConnect())
  )

  const handleSticky = () => (
    dispatch(toggleNavBar())
  )

  return (
    <Header
      handleAuth={ handleAuth }
      isAuthorized={ request.hasOwnProperty('access_token') }
    >
      <Waypoint
        onEnter={ handleSticky }
        onLeave={ handleSticky }
        triggerFrom="above"
      />
    </Header>
  )
}

HeaderContainer.propTypes = {
  auth: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    app: {
      auth
    }
  } = state

  return {
    auth
  }
}

export default connect(mapStateToProps)(HeaderContainer)
