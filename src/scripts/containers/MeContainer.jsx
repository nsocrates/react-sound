import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

class MeContainer extends React.Component {

  componentDidMount() {
    const { dispatch, user } = this.props
    const locationDescriptor = {
      pathname: '#genre',
      query: {
        q: 'trance'
      }
    }
    return user.isAuthenticated
      ? dispatch(replace({ pathname: `#user/${user.userId}` }))
      : dispatch(replace(locationDescriptor))
  }

  render() {
    return <noscript />
  }
}

MeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    user
  } = state.app.auth

  return {
    user
  }
}

export default connect(mapStateToProps)(MeContainer)
