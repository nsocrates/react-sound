import React from 'react'
import * as actionCreators from 'actions/stream'
import Audio from 'components/Audio'
import SoundPlayer from 'components/SoundPlayer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { constructStreamUrl } from 'utils/Utils'

export default class SoundContainer extends React.Component {

  render() {
    const { actions, trackId, streamIsPlaying, streamCanPlay } = this.props
    const src = constructStreamUrl(trackId)
    const audioContainer = ref => this._audioContainer = ref

    return (
      <SoundPlayer
        actions={ actions }
        audioRef={ this._audioContainer }
        streamCanPlay={ streamCanPlay }
        streamIsPlaying={ streamIsPlaying }
      >
        <Audio
          actions={ actions }
          canPlay={ streamCanPlay }
          isPlaying={ streamIsPlaying }
          ref={ audioContainer }
          src={ src }
        />
      </SoundPlayer>
    )
  }
}

SoundContainer.propTypes = {
  actions: React.PropTypes.shape({
    toggleStream: React.PropTypes.func
  }),
  streamCanPlay: React.PropTypes.bool,
  streamIsPlaying: React.PropTypes.bool,
  trackId: React.PropTypes.number
}

SoundContainer.defaultProps = {
  trackId: null
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  const { stream } = state.app

  return {
    currentTime: stream.currentTime,
    duration: stream.duration,
    trackId: stream.trackId,
    streamIsPlaying: stream.isPlaying,
    streamIsSeeking: stream.isPaused,
    streamCanPlay: stream.canPlay
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundContainer)
