import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

class RoutingContainer extends React.Component {

  componentDidMount() {
    const { dispatch, location: { hash } } = this.props
    const ref = hash.split('?') || null
    const [path, search] = ref

    const location = {
      pathname: path || '/',
      search: search ? `?${search}` : null
    }

    return dispatch(replace(location))
  }

  render() {
    return (
      <noscript />
    )
  }
}

RoutingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default connect()(RoutingContainer)
