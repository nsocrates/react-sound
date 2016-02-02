import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlayerTracklist from 'components/PlayerTracklist'
import { requestStream } from 'actions/stream'

export class TracklistContainer extends React.Component {
  render() {
    const { ui } = this.props
    const shouldRenderTracklist = () => {
      if (ui.tracklist.isOpen) {
        return (
          <ReactCSSTransitionGroup
            className="tracklist"
            component="aside"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500 }
            transitionName="tracklist__wrapper"
          >
            <PlayerTracklist { ...this.props } />
          </ReactCSSTransitionGroup>
        )
      }

      return (
        <ReactCSSTransitionGroup
          className="tracklist"
          component="aside"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          transitionName="tracklist__wrapper"
        />
      )
    }

    return shouldRenderTracklist()
  }
}

TracklistContainer.propTypes = {
  tracklist: React.PropTypes.shape({
    ids: React.PropTypes.array
  }),
  ui: React.PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ requestStream }, dispatch)
  }
}

function mapStateToProps(state) {
  const {
    ui,
    entities: { tracks, users },
    media: {
      stream: { trackId },
      player: { tracklist, audio }
    }
  } = state.app

  return {
    userEntity: users,
    trackEntity: tracks,
    ui,
    audio,
    tracklist,
    trackId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TracklistContainer)
