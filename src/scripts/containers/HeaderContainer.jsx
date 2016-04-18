import React from 'react'
import Header from 'components/Header'
import Waypoint from 'components/Waypoint'
import { connect } from 'react-redux'
import { toggleNavBar, toggleDropdown } from 'actions/toggle'
import { authConnect, authDisconnect } from 'actions/authenticate'

function HeaderContainer(props) {
  const { dispatch, user, me, dropdown } = props
  const handleAuth = () => (
    user.isAuthenticated
      ? dispatch(authDisconnect())
      : dispatch(authConnect())
  )

  const handleNavBar = () => (
    dispatch(toggleNavBar())
  )
  const handleDropdown = () => (
    dispatch(toggleDropdown())
  )

  return (
    <Header
      dropdown={ dropdown }
      handleAuth={ handleAuth }
      handleDropdown={ handleDropdown }
      me={ me }
      user={ user }
    >
      <Waypoint
        onEnter={ handleNavBar }
        onLeave={ handleNavBar }
        triggerFrom="above"
      />
    </Header>
  )
}

HeaderContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  dropdown: React.PropTypes.object.isRequired,
  me: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
}

function mapStateToProps({ app }) {
  const {
    auth: {
      user
    },

    entities: {
      users: {
        [user.userId]: me = {}
      }
    },

    ui: {
      toggles: {
        dropdown
      }
    }

  } = app

  return {
    user,
    dropdown,
    me
  }
}

export default connect(mapStateToProps)(HeaderContainer)
