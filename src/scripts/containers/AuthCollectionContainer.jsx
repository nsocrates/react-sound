import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { loadAuthedCollection } from 'actions/auth'
import AuthCollection from 'components/AuthCollection'

class AuthCollectionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.updateComponent = this.updateComponent.bind(this)
  }

  componentDidMount() {
    const { dispatch, auth } = this.props
    const hasLocalStorage = !!localStorage.oauthio_provider_soundcloud

    if (!hasLocalStorage && !auth.result.isAuthorizing && !auth.result.isAuthorized) {
      return dispatch(replace({ location: '/' }))
    }

    if (auth.result.isAuthorized) {
      return this.updateComponent()
    }

    return null
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.auth.result.isAuthorized && newProps.auth.result.isAuthorized) {
      return this.updateComponent()
    }

    return null
  }

  updateComponent() {
    const { dispatch } = this.props
    return dispatch(loadAuthedCollection())
  }

  render() {
    const { auth } = this.props

    return (
      <AuthCollection auth={ auth } />
    )
  }
}

AuthCollectionContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    auth,
    entities
  } = state.app

  return {
    auth,
    entities
  }
}

export default connect(mapStateToProps)(AuthCollectionContainer)
