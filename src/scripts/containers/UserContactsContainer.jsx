import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import { markNumber } from 'utils/formatUtils'

import { loadUserFollowers, loadUserFollowings } from 'actions/user'

import UserContacts from 'components/UserContacts'
import Loader from 'components/Loader'

class UserContactListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handlePropagation = this.handlePropagation.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    const { dispatch, location, params } = this.props
    if ((
      location.state &&
      location.state.isModal &&
      location.state.returnPath
    )) {
      return this.updateComponent(this.props)
    }

    return dispatch(replace(`#user/${params.id}`))
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps
    return location.pathname !== this.props.location.pathname &&
      this.updateComponent(nextProps)
  }

  componentWillUnmount() {
    return this.handleExit
  }

  handleExit() {
    const { dispatch, location } = this.props
    const to = {
      pathname: location.state.returnPath,
      state: {
        isReturnPath: true
      }
    }
    return dispatch(push(to))
  }

  handlePropagation(e) {
    e.stopPropagation()
  }

  handleWaypointEnter() {
    return this.updateComponent(this.props, true)
  }

  updateComponent(props, force = false) {
    const { dispatch, params, routes } = props

    return routes[routes.length - 1].path === 'followers'
      ? dispatch(loadUserFollowers(params.id, force))
      : dispatch(loadUserFollowings(params.id, force))
  }

  render() {
    const { params, routes, userCollection, userEntity } = this.props
    const currentPath = routes[routes.length - 1].path
    const payload = {
      currentPath,
      partition: currentPath === 'followers'
        ? this.props.followers
        : this.props.followings,
      count: currentPath === 'followers'
        ? markNumber(userEntity[params.id].followers_count)
        : markNumber(userEntity[params.id].followings_count)
    }

    if (!Object.keys(payload.partition).length) {
      return (
        <Loader className="loader--bottom" />
      )
    }

    return (
      <UserContacts
        handleExit={ this.handleExit }
        handlePropagation={ this.handlePropagation }
        handleWaypoint={ this.handleWaypointEnter }
        payload={ payload }
        userCollection={ userCollection }
        userEntity={ userEntity }
      />
    )
  }
}

UserContactListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  followers: PropTypes.object.isRequired,
  followings: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  userCollection: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    auth: {
      collection
    },
    entities: {
      users
    },
    partition: {
      followingsByUser,
      followersByUser
    }
  } = state.app

  const { params } = ownProps
  return {
    userEntity: users,
    followings: followingsByUser[params.id] || {},
    followers: followersByUser[params.id] || {},
    userCollection: collection.followings
  }
}

export default connect(mapStateToProps)(UserContactListContainer)
