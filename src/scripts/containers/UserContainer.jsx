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
    if ((
          nextProps.location.key !== this.props.location.key &&
          nextProps.location.state &&
          nextProps.location.state.isModal
    )) {
      this.previousChildren = this.props.children
    }

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
      location,
      children,
      shouldPlay,
      menu,
      userCollection
    } = this.props
    const state = location.state || {}

    if (!Object.keys(user).length) {
      return <Loader className="loader--top" />
    }

    return (
      <UserProfile
        basePath={`#user/${user.id}`}
        currPath={ location.pathname }
        dispatch={ dispatch }
        menu={ menu }
        shouldPlay={ shouldPlay }
        user={ user }
        userCollection={ userCollection }
      >
        { state.isModal ? this.previousChildren : children }
        { state.isModal && children }
     </UserProfile>
    )
  }
}

UserContainer.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
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
  const { params: { id } } = ownProps

  return {
    menu: profileMenu,
    shouldPlay,
    user: users[id] || {},
    userCollection: followings
  }
}

export default connect(mapStateToProps)(UserContainer)
