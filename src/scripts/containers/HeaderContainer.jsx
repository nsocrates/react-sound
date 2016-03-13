import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { triggerSticky } from 'actions/ui'

import { OAuth } from 'oauth/oauth'
import { AUTH } from 'constants/Auth'
import { authConnect, authDisconnect } from 'actions/auth'

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleTriggerSticky = this.handleTriggerSticky.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth() {
    const { dispatch, auth: { request } } = this.props
    if (request.hasOwnProperty('access_token')) {
      return dispatch(authDisconnect())
    }

    return dispatch(authConnect())
  }

  handleTriggerSticky() {
    const { dispatch } = this.props
    return dispatch(triggerSticky())
  }

  render() {
    const { auth: { request } } = this.props
    return (
      <Header
        handleAuth={ this.handleAuth }
        isAuthorized={ request.hasOwnProperty('access_token') }
      >
        <Waypoint
          onEnter={ this.handleTriggerSticky }
          onLeave={ this.handleTriggerSticky }
          triggerFrom="above"
        />
      </Header>
    )
  }
}

HeaderContainer.propTypes = {
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
