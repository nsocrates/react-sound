import React from 'react'
import Main from 'components/Main'
import { connect } from 'react-redux'
import { loadStream, toggleStream } from 'actions/stream'

export default class MainContainer extends React.Component {

  render() {
    return (
      <Main
        {...this.props}
      />
    )
  }
}

MainContainer.propTypes = {
  streamTrackId: React.PropTypes.number
}

const mapDispatchToProps = {
  loadStream,
  toggleStream
}

function mapStateToProps(state) {
  const { entities, requested, partition, stream } = state.app

  return {
    trackEntity: entities.tracks,
    userEntity: entities.users,
    tracksByGenre: partition.tracksByGenre,
    requested,
    streamTrackId: stream.trackId,
    streamIsPlaying: stream.isPlaying,
    streamIsPaused: stream.isPaused
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
