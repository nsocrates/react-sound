import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadUser, resolveUser } from 'actions/user'

import UserProfile from 'components/UserProfile'
import Loader from 'components/Loader'

class UserContainer extends React.Component {

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props

    return /^\d+$/.test(params.id)
      ? dispatch(loadUser(params.id))
      : dispatch(resolveUser(params.id))
  }

  render() {
    const {
      user,
      dispatch,
      children,
      shouldPlay,
      menu,
      currPath
    } = this.props

    if (!Object.keys(user).length) {
      return <Loader className="loader--top" />
    }

    return (
      <UserProfile
        basePath={`#user/${user.id}`}
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

UserContainer.propTypes = {
  children: PropTypes.node.isRequired,
  currPath: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      entities: { users },
      media: {
        stream: { shouldPlay }
      },
      ui: {
        toggles: { profileMenu }
      }
    }
  } = state
  const { location, params: { id } } = ownProps

  return {
    currPath: location.pathname,
    menu: profileMenu,
    shouldPlay,
    user: users[id] || {}
  }
}

export default connect(mapStateToProps)(UserContainer)
