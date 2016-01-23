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
    const { stream: { trackId }, trackEntity, userEntity } = this.props
    const src = constructStreamUrl(trackId)
    const audioStream = ref => this._audioStream = ref
    const getTrackData = () => {
      let track = {
        artistName: null,
        songName: null,
        getArtwork() { return null }
      }

      if (trackId) {
        track = {
          artistName: trackEntity[trackId].title.split(' - ')[0],
          songName: trackEntity[trackId].title.split(' - ')[1],
          getArtwork() {
            let artwork
            if (!trackEntity[trackId].artwork_url) {
              const user_id = trackEntity[trackId].user_id
              artwork = userEntity[user_id].avatar_url.replace(/crop/gi, 'large')
              return artwork
            }
            artwork = trackEntity[trackId].artwork_url.replace(/crop/gi, 'large')
            return artwork
          }
        }
      }
      return track
    }

    return (
      <AudioPlayer
        { ...this.props }
        audioRef={ this._audioStream }
        trackData={ getTrackData() }
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
  playerActions: React.PropTypes.objectOf(React.PropTypes.func.isRequired),
  stream: React.PropTypes.shape({
    trackId: React.PropTypes.number
  }),
  streamActions: React.PropTypes.objectOf(React.PropTypes.func.isRequired),
  trackEntity: React.PropTypes.shape({
    artwork_url: React.PropTypes.string,
    users: React.PropTypes.number
  }),
  userEntity: React.PropTypes.shape({
    avatar_url: React.PropTypes.string
  })
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
