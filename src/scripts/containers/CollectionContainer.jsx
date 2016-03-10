import React from 'react'
import End from 'components/End'
import Gallery from 'components/Gallery'
import Main from 'components/Main'
import Waypoint from 'components/Waypoint'
import Loader from 'components/Loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { loadUser } from 'actions/user'
import { push } from 'react-router-redux'
import { requestStream } from 'actions/stream'
import { trackFactory } from 'utils/Utils'
import { loadCollection } from 'actions/collection'

class CollectionContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateCollection()
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps
    if (this.props.location.query !== location.query) {
      return this.updateCollection(location.pathname, location.query.q)
    }

    return null
  }

  updateCollection(path, q, force) {
    const { location, actions } = this.props
    const pathname = path || location.pathname
    const query = q || location.query.q

    actions.loadCollection(pathname, query, force)
  }

  handleWaypointEnter() {
    return this.updateCollection(null, null, true)
  }

  render() {
    const {
      actions,
      audioIsPlaying,
      streamTrackId,
      userEntity,
      trackEntity,
      shouldPlay
    } = this.props

    const getCollection = () => {
      const { tracksByGenre, searchesByInput, tracksByTag, location } = this.props

      switch (location.pathname) {
        case '#genre':
          return tracksByGenre[location.query.q]
        case '#search':
          return searchesByInput[location.query.q]
        case '#tag':
          return tracksByTag[location.query.q]
        default:
          return null
      }
    }

    const collection = getCollection()

    if (!collection) {
      return <Loader className="loader--bottom" />
    }

    const { isFetching, next_href } = collection

    // Render Gallery
    const renderGallery = () => {
      const ids = collection.ids
      const gallery = ids.map((item, index) => {
        const args = {
          userObject: userEntity[trackEntity[item].user_id],
          mediaObject: trackEntity[item]
        }
        const trackData = trackFactory(args)
        const trackId = item
        return (
          <Gallery
            actions={ actions }
            audioIsPlaying={ audioIsPlaying }
            key={ `gallery__${index}_${trackId}` }
            streamTrackId={ streamTrackId }
            trackData={ trackData }
          />
        )
      })
      return gallery
    }

    const shouldRenderWaypoint = () => {
      if (next_href) {
        return (
          <Waypoint
            className="waypoint waypoint--bottom"
            onEnter={ this.handleWaypointEnter }
          />
        )
      }

      return null
    }

    return (
      <Main
        className="main main__collection"
        shouldPush={ shouldPlay }
      >
        <div className="main__container">
          { renderGallery() }
          { isFetching ? <Loader className="loader--bottom" /> : shouldRenderWaypoint() }
          { !next_href && !isFetching ? <End className="end--bottom" /> : null }
        </div>
      </Main>
    )
  }
}

CollectionContainer.propTypes = {
  actions: React.PropTypes.shape(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool,
  location: React.PropTypes.object,
  searchesByInput: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      )
    })
  ),
  shouldPlay: React.PropTypes.bool,
  streamTrackId: React.PropTypes.number,
  trackEntity: React.PropTypes.object.isRequired,
  tracksByGenre: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      )
    })
  ),
  tracksByTag: React.PropTypes.object,
  userEntity: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      requestStream,
      loadCollection,
      loadGenre,
      loadSearch,
      loadUser,
      push
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const {
    app: { entities, partition, media }
  } = state

  return {
    audioIsPlaying: media.player.audio.isPlaying,
    searchesByInput: partition.searchesByInput,
    shouldPlay: media.stream.shouldPlay,
    streamTrackId: media.stream.trackId,
    trackEntity: entities.tracks,
    tracksByGenre: partition.tracksByGenre,
    tracksByTag: partition.tracksByTag,
    userEntity: entities.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)
