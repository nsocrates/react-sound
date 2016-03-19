import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { loadAuthedCollection } from 'actions/auth'

import AuthCollection from 'components/AuthCollection'

class AuthCollectionContainer extends React.Component {

  componentDidMount() {
    const { dispatch, auth } = this.props

    if (!auth.result.isAuthorized) {
      return dispatch(replace({ location: '/' }))
    }

    return dispatch(loadAuthedCollection())
  }

  render() {
    const { shouldPlay, children, currPath } = this.props
    return (
      <AuthCollection
        currPath={ currPath }
        shouldPlay={ shouldPlay }
      >
        { children }
      </AuthCollection>
    )
  }
}

AuthCollectionContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  currPath: PropTypes.string.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    auth,
    media: {
      stream: { shouldPlay }
    }
  } = state.app

  const { location } = ownProps

  return {
    auth,
    shouldPlay,
    currPath: location.pathname
  }
}

export default connect(mapStateToProps)(AuthCollectionContainer)
