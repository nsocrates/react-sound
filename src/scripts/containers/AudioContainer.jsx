import React from 'react'
import * as streamActionCreators from 'actions/stream'
import * as playerActionCreators from 'actions/player'
import AudioStream from 'components/AudioStream'
import AudioPlayer from 'components/AudioPlayer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { constructStreamUrl } from 'utils/Utils'

export default class AudioContainer extends React.Component {

  render() {
    const { stream: { trackId }} = this.props
    const src = constructStreamUrl(trackId)
    const audioStream = ref => this._audioStream = ref

    return (
      <AudioPlayer
        { ...this.props }
        audioRef={ this._audioStream }
      >
        <AudioStream
          playerActions={ this.props.playerActions }
          ref={ audioStream }
          src={ src }
          streamActions={ this.props.streamActions }
        />
      </AudioPlayer>
    )
  }
}

AudioContainer.propTypes = {
  playerActions: React.PropTypes.objectOf(React.PropTypes.func.isRequired),
  stream: React.PropTypes.shape({
    trackId: React.PropTypes.number
  }),
  streamActions: React.PropTypes.objectOf(React.PropTypes.func.isRequired)
}

function mapDispatchToProps(dispatch) {
  return {
    streamActions: bindActionCreators(streamActionCreators, dispatch),
    playerActions: bindActionCreators(playerActionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  const { stream, player } = state.app.media

  return {
    stream,
    player
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
