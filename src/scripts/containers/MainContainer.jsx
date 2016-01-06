import React from 'react'
import Main from 'components/Main'
import { connect } from 'react-redux'

export default class MainContainer extends React.Component {
  render() {
    return (
      <Main {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const { entities, requested, partition } = state.app

  return {
    entities,
    partition,
    requested
  }
}

export default connect(mapStateToProps)(MainContainer)
