import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AuthView from 'components/AuthView'

function AuthViewContainer(props) {
  const { shouldPlay, children, currPath } = props
  return (
    <AuthView
      currPath={ currPath }
      shouldPlay={ shouldPlay }
    >
      { children }
    </AuthView>
  )
}

AuthViewContainer.propTypes = {
  children: PropTypes.node.isRequired,
  currPath: PropTypes.string.isRequired,
  shouldPlay: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    media: {
      stream: { shouldPlay }
    }
  } = state.app

  const { location } = ownProps

  return {
    shouldPlay,
    currPath: location.pathname
  }
}

export default connect(mapStateToProps)(AuthViewContainer)
