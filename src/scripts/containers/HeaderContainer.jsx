import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { toggleNavBar, toggleDropdown } from 'actions/toggle'
import { authConnect, notifConnect, notifDisconnect, loadAuthedCollection } from 'actions/auth'

class HeaderContainer extends React.Component {
  componentDidMount() {
    // const { dispatch, auth: { result } } = this.props

    // return (!result.id)
    //   ? dispatch(authConnect()).then(() => dispatch(loadAuthedCollection()))
    //   : null
  }

  render() {
    const { dispatch, auth, me, dropdown } = this.props

    const handleAuth = () => (
      auth.result.isAuthorized
        ? dispatch(notifDisconnect())
        : dispatch(notifConnect())
    )

    const handleNavBar = () => (
      dispatch(toggleNavBar())
    )
    const handleDropdown = () => (
      dispatch(toggleDropdown())
    )

    return (
      <Header
        auth={ auth }
        handleAuth={ handleAuth }
        handleDropdown={ handleDropdown }
        me={ me }
        dropdown={ dropdown }
      >
        <Waypoint
          onEnter={ handleNavBar }
          onLeave={ handleNavBar }
          triggerFrom="above"
        />
      </Header>
    )
  }
}

HeaderContainer.propTypes = {
  auth: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  dropdown: React.PropTypes.object.isRequired,
  me: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    auth,
    ui: {
      toggles: {
        dropdown
      }
    },
    entities: {
      users: {
        [auth.result.id]: me = {}
      }
    }
  } = state.app

  return {
    auth,
    dropdown,
    me
  }
}

export default connect(mapStateToProps)(HeaderContainer)
