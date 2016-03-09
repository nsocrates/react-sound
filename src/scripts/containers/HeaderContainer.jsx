import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { triggerSticky } from 'actions/ui'

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleTriggerSticky = this.handleTriggerSticky.bind(this)
  }

  handleTriggerSticky() {
    const { dispatch } = this.props
    return dispatch(triggerSticky())
  }

  render() {
    return (
      <Header>
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
