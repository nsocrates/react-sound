import * as playerActionCreators from 'actions/player'
import * as streamActionCreators from 'actions/stream'
import AudioPlayer from 'components/AudioPlayer'
import AudioStream from 'components/AudioStream'
import omit from 'lodash/omit'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TracklistContainer from './TracklistContainer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { constructStreamUrl } from 'utils/urlUtils'
import mediaFactory from 'utils/mediaFactory'
import { toggleTracklist } from 'actions/toggle'

class AudioContainer extends React.Component {

  render() {
    const {
      userObject,
      trackObject,
      playerActions,
      streamActions,
      player: {
        audio,
        tracklist
      },
      stream: {
        trackId,
        shouldPlay
      }
    } = this.props
    const rest = omit(this.props, ['streamActions', 'trackObject', 'userObject', 'stream'])

    const args = {
      userObject,
      mediaObject: trackObject
    }
    const trackData = mediaFactory(args)
    const src = constructStreamUrl(trackId)
    const audioStream = ref => (this._audioStream = ref)

    const ReactCSSTransitionNames = {
      enter: 'enter',
      leave: 'leave'
    }

    const shouldRenderAudioContainer = () => {
      if (shouldPlay) {
        return (
          <ReactCSSTransitionGroup
            className="music-box"
            component="section"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 1000 }
            transitionName={ ReactCSSTransitionNames }
          >
            <AudioStream
              playerActions={ playerActions }
              playerIsSeeking={ audio.isSeeking }
              ref={ audioStream }
              src={ src }
              streamActions={ streamActions }
              trackId={ trackId }
              tracklist={ tracklist }
              volume={ rest.player.volume.level }
            />
            <TracklistContainer />
            <AudioPlayer
              { ...rest }
              audioRef={ this._audioStream }
              shouldPlay={ shouldPlay }
              trackData={ trackData }
            />
          </ReactCSSTransitionGroup>
        )
      }

      return (
        <ReactCSSTransitionGroup
          className="music-box"
          component="section"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 1000 }
          transitionName={ ReactCSSTransitionNames }
        />
      )
    }

    return shouldRenderAudioContainer()
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
  trackObject: React.PropTypes.object,
  userObject: React.PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    streamActions: bindActionCreators(streamActionCreators, dispatch),
    playerActions: bindActionCreators(playerActionCreators, dispatch),
    uiActions: bindActionCreators({ toggleTracklist }, dispatch)
  }
}

function mapStateToProps(state) {
  const { media: { stream, player }, entities: { tracks, users } } = state.app
  return {
    player,
    stream,
    userEntity: users,
    trackObject: tracks[stream.trackId],
    userObject: stream.trackId ? users[tracks[stream.trackId].user_id] : {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
