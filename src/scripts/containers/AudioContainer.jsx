import React from 'react'
import * as playerActionCreators from 'actions/player'
import * as streamActionCreators from 'actions/stream'
import AudioPlayer from 'components/AudioPlayer'
import AudioStream from 'components/AudioStream'
import omit from 'lodash/omit'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { constructStreamUrl, trackFactory } from 'utils/Utils'

export default class AudioContainer extends React.Component {

  render() {
    const { stream: { trackId, canPlay }, userEntity, trackEntity } = this.props
    const args = { trackId, userEntity, trackEntity }
    const trackData = trackFactory(args)
    const src = constructStreamUrl(trackId)
    const audioStream = ref => this._audioStream = ref

    const other = omit(this.props, ['streamActions', 'trackEntity', 'userEntity', 'stream'])

    return (
      <AudioPlayer
        { ...other }
        audioRef={ this._audioStream }
        canPlay={ canPlay }
        trackData={ trackData }
      >
        <AudioStream
          playerActions={ this.props.playerActions }
          playerIsSeeking={ this.props.player.audio.isSeeking }
          ref={ audioStream }
          src={ src }
          streamActions={ this.props.streamActions }
        />
      </AudioPlayer>
    )
  }
}

AudioContainer.propTypes = {
  player: React.PropTypes.shape({
    audio: React.PropTypes.shape({
      isSeeking: React.PropTypes.bool
    })
  }),
  playerActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  stream: React.PropTypes.shape({
    canPlay: React.PropTypes.bool,
    trackId: React.PropTypes.number
  }),
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  trackEntity: React.PropTypes.objectOf(
    React.PropTypes.object.isRequired
  ),
  userEntity: React.PropTypes.objectOf(
    React.PropTypes.object.isRequired
  )
}

function mapDispatchToProps(dispatch) {
  return {
    streamActions: bindActionCreators(streamActionCreators, dispatch),
    playerActions: bindActionCreators(playerActionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  const { media: { stream, player }, entities: { tracks, users }} = state.app

  return {
    player,
    stream,
    trackEntity: tracks,
    userEntity: users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
