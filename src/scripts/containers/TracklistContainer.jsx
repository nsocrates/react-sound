import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Tracklist from 'components/Tracklist'

class TracklistContainer extends React.Component {
  render() {
    const { ui, ids, userEntity, trackEntity, trackId, isPlaying, dispatch } = this.props
    const shouldRenderTracklist = () => {
      if (ui.tracklist.isOpen) {
        return (
          <ReactCSSTransitionGroup
            className="tracklist"
            component="aside"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500 }
            transitionName="tracklist__player"
          >
            <Tracklist
              dispatch={ dispatch }
              ids={ ids }
              isPlaying={ isPlaying }
              trackEntity={ trackEntity }
              trackId={ trackId }
              userEntity={ userEntity }
            />
          </ReactCSSTransitionGroup>
        )
      }

      return (
        <ReactCSSTransitionGroup
          className="tracklist"
          component="aside"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          transitionName="tracklist__player"
        />
      )
    }

    return shouldRenderTracklist()
  }
}

TracklistContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  ids: React.PropTypes.array,
  isPlaying: React.PropTypes.bool,
  trackEntity: React.PropTypes.object,
  trackId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  ui: React.PropTypes.object,
  userEntity: React.PropTypes.object
}

function mapStateToProps(state) {
  const {
    ui,
    entities: { tracks, users },
    media: {
      stream: { trackId },
      player: {
        audio: {
          isPlaying
        },
        tracklist: { ids }
      }
    }
  } = state.app

  return {
    userEntity: users,
    trackEntity: tracks,
    ui,
    isPlaying,
    ids,
    trackId
  }
}

export default connect(mapStateToProps)(TracklistContainer)
