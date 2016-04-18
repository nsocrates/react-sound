import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchNeeds } from 'utils/fetchComponentData'
import { loadTrackActivities } from 'actions/activities'
import CollectionWrapper from 'components/CollectionWrapper'

const needs = [loadTrackActivities]

class StreamContainer extends React.Component {
  constructor(props) {
    super(props)
    this.updateComponent = this.updateComponent.bind(this)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent(forceNext) {
    const { dispatch, location } = this.props
    const { pathname } = location
    return fetchNeeds(needs, dispatch, { pathname }, forceNext)
  }

  handleWaypointEnter() {
    return this.updateComponent(true)
  }

  render() {
    const { auth, entities, audioIsPlaying, streamTrackId, location } = this.props
    return (
      <CollectionWrapper
        audioIsPlaying={ audioIsPlaying }
        auth={ auth }
        entities={ entities }
        pathname={ location.pathname }
        handleWaypointEnter={ this.handleWaypointEnter }
        streamTrackId={ streamTrackId }
      />
    )
  }
}

StreamContainer.propTypes = {
  audioIsPlaying: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  streamTrackId: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const {
    auth,
    entities,
    media: {
      stream: { trackId },
      player: {
        audio: { isPlaying }
      }
    }
  } = state.app

  return {
    auth,
    entities,
    streamTrackId: trackId,
    audioIsPlaying: isPlaying
  }
}

const StreamWrap = connect(mapStateToProps)(StreamContainer)
StreamWrap.needs = needs

export default StreamWrap
