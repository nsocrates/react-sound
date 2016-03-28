import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadUser, resolveUser } from 'actions/user'

import UserProfile from 'components/UserProfile'
import Loader from 'components/Loader'

class UserContainer extends React.Component {

  componentDidMount() {
    return this.updateComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      return this.updateComponent(nextProps.params.id)
    }

    return null
  }

  updateComponent(id) {
    const { dispatch, params } = this.props
    const user = id || params.id

    return /^\d+$/.test(user)
      ? dispatch(loadUser(user))
      : dispatch(resolveUser(user))
  }

  render() {
    const {
      user,
      dispatch,
      children,
      shouldPlay,
      menu,
      currPath,
      userCollection
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
        userCollection={ userCollection }
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
  user: PropTypes.object.isRequired,
  userCollection: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      entities: { users },
      auth: {
        collection: { followings }
      },
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
    user: users[id] || {},
    userCollection: followings
  }
}

export default connect(mapStateToProps)(UserContainer)
