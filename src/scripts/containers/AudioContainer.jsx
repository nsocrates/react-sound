import * as playerActionCreators from 'actions/player'
import * as streamActionCreators from 'actions/stream'
import { toggleTracklist } from 'actions/ui'
import AudioPlayer from 'components/AudioPlayer'
import AudioStream from 'components/AudioStream'
import TracklistContainer from './TracklistContainer'
import omit from 'lodash/omit'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { constructStreamUrl, trackFactory } from 'utils/Utils'

class AudioContainer extends React.Component {

  render() {
    const {
      userEntity,
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
    const rest = omit(this.props, ['streamActions', 'trackObject', 'userEntity', 'stream'])
    const args = { userEntity, mediaObject: trackObject }
    const trackData = trackFactory(args)
    const src = constructStreamUrl(trackId)
    const audioStream = ref => this._audioStream = ref

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
            transitionLeaveTimeout={ 500 }
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
          transitionLeaveTimeout={ 500 }
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
    trackId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  }),
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  trackObject: React.PropTypes.object,
  userEntity: React.PropTypes.objectOf(
    React.PropTypes.object.isRequired
  )
}

function mapDispatchToProps(dispatch) {
  return {
    streamActions: bindActionCreators(streamActionCreators, dispatch),
    playerActions: bindActionCreators(playerActionCreators, dispatch),
    uiActions: bindActionCreators({ toggleTracklist }, dispatch)
  }
}

function mapStateToProps(state) {
  const { media: { stream, player }, entities: { tracks, users }} = state.app

  return {
    player,
    stream,
    userEntity: users,
    trackObject: tracks[stream.trackId]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioContainer)
