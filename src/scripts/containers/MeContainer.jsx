import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

class MeContainer extends React.Component {

  componentDidMount() {
    const { dispatch, result } = this.props
    const locationDescriptor = {
      pathname: '#genre',
      query: {
        q: 'trance'
      }
    }
    return result.isAuthorized
      ? dispatch(replace({ pathname: `#user/${result.id}` }))
      : dispatch(replace(locationDescriptor))
  }

  render() {
    return <noscript />
  }
}

MeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    result
  } = state.app.auth

  return {
    result
  }
}

export default connect(mapStateToProps)(MeContainer)
