import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Tracklist from 'components/Tracklist'

function TracklistContainer(props) {
  const { tracklist, ids, userEntity, trackEntity, trackId, isPlaying, dispatch } = props

  const open = () => (
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

  const close = () => (
      <ReactCSSTransitionGroup
        className="tracklist"
        component="aside"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionName="tracklist__player"
      />
  )

  return tracklist.isOpen ? open() : close()
}

TracklistContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  ids: React.PropTypes.array,
  isPlaying: React.PropTypes.bool,
  trackEntity: React.PropTypes.object,
  trackId: React.PropTypes.number,
  tracklist: React.PropTypes.object,
  userEntity: React.PropTypes.object
}

function mapStateToProps(state) {
  const {
    ui: { toggles: { tracklist } },
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
    tracklist,
    isPlaying,
    ids,
    trackId
  }
}

export default connect(mapStateToProps)(TracklistContainer)
