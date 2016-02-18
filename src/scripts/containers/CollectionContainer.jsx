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

  componentDidUpdate() {
    const { requested, location } = this.props

    if (location.query.q !== requested.query) {
      return this.updateCollection()
    }
  }

  updateCollection() {
    const { location, actions } = this.props
    const { pathname, query } = location

    actions.loadCollection(pathname, query.q)
  }

  handleWaypointEnter() {
    const { actions, requested: { isFetching, type, query }} = this.props

    if (!isFetching) {
      return type === 'GENRE' ? actions.loadGenre(query) : actions.loadSearch(query)
    }
  }

  render() {
    const {
      actions,
      audioIsPlaying,
      streamTrackId,
      tracksByGenre,
      searchesByInput,
      userEntity,
      trackEntity,
      shouldPlay,
      requested: {
        isFetching,
        query,
        hasMore
      }
    } = this.props

    const collection = tracksByGenre[query] || searchesByInput[query]

    if (!collection) {
      return null
    }

    // Render Gallery
    const renderGallery = () => {
      const trackIds = collection.ids
      const gallery = trackIds.map((item, index) => {
        const args = {
          trackId: collection.ids[index],
          userEntity,
          trackEntity
        }
        const trackData = trackFactory(args)
        const trackId = collection.ids[index]
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
      if (hasMore) {
        return (
          <Waypoint
            className="waypoint waypoint--bottom"
            onEnter={ this.handleWaypointEnter }
          />
        )
      }
    }

    return (
      <Main
        className="main__collection"
        shouldPush={ shouldPlay }
      >
        <div className="collection__container">
          { renderGallery() }
          { isFetching ? <Loader className="loader--bottom"/> : shouldRenderWaypoint() }
          { !hasMore && !isFetching ? <End className="end--bottom" /> : null }
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
  requested: React.PropTypes.object,
  searchesByInput: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      )
    })
  ),
  shouldPlay: React.PropTypes.bool,
  streamTrackId: React.PropTypes.number,
  trackEntity: React.PropTypes.objectOf(
    React.PropTypes.object
  ),
  tracksByGenre: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      )
    })
  ),
  userEntity: React.PropTypes.objectOf(
    React.PropTypes.object
  )
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
    app: { entities, requested, partition, media }
  } = state

  return {
    // location,
    audioIsPlaying: media.player.audio.isPlaying,
    requested,
    searchesByInput: partition.searchesByInput,
    shouldPlay: media.stream.shouldPlay,
    streamTrackId: media.stream.trackId,
    trackEntity: entities.tracks,
    tracksByGenre: partition.tracksByGenre,
    userEntity: entities.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)
