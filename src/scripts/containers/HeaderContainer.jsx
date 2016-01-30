import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { triggerSticky } from 'actions/ui'

export default class HeaderContainer extends React.Component {
  render() {
    const { actions } = this.props

    return (
      <Header>
        <Waypoint
          onEnter={ actions.triggerSticky }
          onLeave={ actions.triggerSticky }
        />
      </Header>
    )
  }
}

HeaderContainer.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      triggerSticky
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { navbar } = state.app.ui

  return {
    navbar
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
