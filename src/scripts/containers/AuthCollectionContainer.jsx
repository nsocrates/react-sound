import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchNeeds } from 'utils/fetchComponentData'
import { loadCollection } from 'actions/conditional'
import CollectionWrapper from 'components/CollectionWrapper'
import Loader from 'components/Loader'

const needs = [loadCollection]

class AuthCollectionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.updateComponent = this.updateComponent.bind(this)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname
      && this.updateComponent(nextProps)
  }

  updateComponent(props, forceNext) {
    const { dispatch, location } = props
    const { pathname } = location
    return fetchNeeds(needs, dispatch, { pathname }, forceNext)
  }

  handleWaypointEnter() {
    return this.updateComponent(this.props)
  }

  render() {
    const { auth, entities, audioIsPlaying, streamTrackId, location } = this.props
    const { stream, likes, playlists } = auth

    const hasInit = likes.playlists.offset
      || likes.tracks.offset > 0
      || likes.followings.offset > 0
      || stream.offset > 0
      || playlists.offset > 0

    if (!hasInit) {
      return <Loader className="loader--bottom" />
    }

    return (
      <CollectionWrapper
        audioIsPlaying={ audioIsPlaying }
        auth={ auth }
        pathname={ location.pathname }
        entities={ entities }
        handleWaypointEnter={ this.handleWaypointEnter }
        streamTrackId={ streamTrackId }
      />
    )
  }
}

AuthCollectionContainer.propTypes = {
  audioIsPlaying: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  authPlaylists: PropTypes.array,
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

const AuthCollectionWrap = connect(mapStateToProps)(AuthCollectionContainer)
AuthCollectionWrap.needs = needs

export default AuthCollectionWrap
