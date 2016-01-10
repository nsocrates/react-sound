import React from 'react'
import { connect } from 'react-redux'
import { loadStream, toggleStream } from 'actions/stream'
import SoundPlayer from 'components/SoundPlayer'

export default class SoundContainer extends React.Component {
  render() {
    return (
      <SoundPlayer {...this.props} />
    )
  }
}

const mapDispatchToProps = {
  loadStream,
  toggleStream
}

function mapStateToProps(state) {
  const { stream } = state.app

  return {
    currentTime: stream.currentTime,
    duration: stream.duration,
    trackId: stream.trackId,
    streamIsPlaying: stream.isPlaying,
    streamIsSeeking: stream.isPaused
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundContainer)
