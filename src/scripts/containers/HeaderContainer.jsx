import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { triggerSticky } from 'actions/ui'

import { OAuth } from 'oauth/oauth'
import { AUTH } from 'constants/Auth'
import authorizeUser from 'actions/auth'

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleTriggerSticky = this.handleTriggerSticky.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(authorizeUser())
  }

  handleTriggerSticky() {
    const { dispatch } = this.props
    return dispatch(triggerSticky())
  }

  render() {
    return (
      <Header onClick={ this.handleClick }>
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

export default connect()(HeaderContainer)
