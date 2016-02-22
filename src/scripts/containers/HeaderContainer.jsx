import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { triggerSticky } from 'actions/ui'

class HeaderContainer extends React.Component {
  render() {
    const { actions } = this.props

    return (
      <Header>
        <Waypoint
          onEnter={ actions.triggerSticky }
          onLeave={ actions.triggerSticky }
          triggerFrom="above"
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

export default connect(() => ({}), mapDispatchToProps)(HeaderContainer)
