import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getAuthedUser } from 'actions/auth'

import End from 'components/End'
import UserProfile from 'components/UserProfile'

class MeContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    return dispatch(getAuthedUser())
  }

  render() {
    const {
      auth,
      children,
      currPath,
      dispatch,
      menu,
      shouldPlay,
      user
    } = this.props

    if (!auth.result.isAuthorized || !Object.keys(user).length) {
      return <End text="YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE." />
    }

    return (
      <UserProfile
        basePath={ '#me' }
        currPath={ currPath }
        dispatch={ dispatch }
        menu={ menu }
        shouldPlay={ shouldPlay }
        user={ user }
      >
        { children }
      </UserProfile>
    )
  }
}

MeContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  currPath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      auth,
      entities: { users },
      media: {
        stream: { shouldPlay }
      },
      ui: {
        toggles: { profileMenu }
      }
    }
  } = state
  const { location } = ownProps

  return {
    auth,
    currPath: location.pathname,
    menu: profileMenu,
    shouldPlay,
    user: users[auth.result.id] || {}
  }
}

export default connect(mapStateToProps)(MeContainer)
