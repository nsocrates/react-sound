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
    trackEntity: entities.tracks,
    userEntity: entities.users,
    tracksByGenre: partition.tracksByGenre,
    requested
  }
}

export default connect(mapStateToProps)(MainContainer)
