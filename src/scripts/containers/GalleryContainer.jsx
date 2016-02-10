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

class GalleryContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
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
      requested: {
        isFetching,
        query,
        hasMore,
        hasCache
      }
    } = this.props

    // Render Gallery
    const renderGallery = () => {
      const group = tracksByGenre[query] || searchesByInput[query]
      const trackIds = group.ids
      const gallery = trackIds.map((item, index) => {
        const args = {
          trackId: group.ids[index],
          userEntity,
          trackEntity
        }
        const trackData = trackFactory(args)
        const trackId = group.ids[index]
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
            className="rw__gallery"
            onEnter={ this.handleWaypointEnter }
          />
        )
      }
    }

    return (
      <Main className="gallery">
        <div className="gallery__container">
          { hasCache ? renderGallery() : null }
          { isFetching ? <Loader /> : shouldRenderWaypoint() }
          { !hasMore && !isFetching ? <End className="rw__end rw__end--gallery" /> : null }
        </div>
      </Main>
    )
  }
}

GalleryContainer.propTypes = {
  actions: React.PropTypes.shape(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool,
  requested: React.PropTypes.object,
  searchesByInput: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
      )
    })
  ),
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
      loadGenre,
      loadSearch,
      loadUser,
      push
    }, dispatch)
  }
}

function mapStateToProps(state) {
  const { entities, requested, partition, media } = state.app

  return {
    audioIsPlaying: media.player.audio.isPlaying,
    requested,
    streamTrackId: media.stream.trackId,
    searchesByInput: partition.searchesByInput,
    trackEntity: entities.tracks,
    tracksByGenre: partition.tracksByGenre,
    userEntity: entities.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer)
