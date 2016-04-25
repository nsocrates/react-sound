import React from 'react'
import Main from 'components/Main'
import MediaCards from 'components/MediaCards'
import WaypointLoader from 'components/WaypointLoader'
import { connect } from 'react-redux'
import { fetchNeeds } from 'utils/fetchComponentData'
import { loadGallery } from 'actions/conditional'

const needs = [loadGallery]

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    fetchNeeds(needs, dispatch, location)
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps

    return this.props.location.query !== location.query
      && this.updateCollection(location)
  }

  updateCollection(location, force) {
    const { dispatch } = this.props
    return dispatch(loadGallery(location, force))
  }

  handleWaypointEnter() {
    const { location } = this.props
    return this.updateCollection(location, true)
  }

  render() {
    const {
      audioIsPlaying,
      likedTracks,
      shouldPlay,
      streamTrackId,
      trackEntity,
      userEntity
    } = this.props

    const getCollection = () => {
      const { tracksByGenre, searchesByInput, tracksByTag, location } = this.props
      const { pathname, query } = location

      switch (pathname) {
        case '/genre':
          return tracksByGenre[query.q]
        case '/search':
          return searchesByInput[query.q]
        case '/tag':
          return tracksByTag[query.q]
        default:
          return {}
      }
    }

    const collection = getCollection() || {}
    const { isFetching, next_href, offset } = collection

    return (
      <Main
        className="main main__collection"
        shouldPush={ shouldPlay }
      >
        <div className="main__container">

          { !!Object.keys(collection).length &&
            <MediaCards
              className="cards"
              collectionIds={ likedTracks.ids }
              hasLoaded={ offset > -1 }
              ids={ collection.ids }
              isPlaying={ audioIsPlaying }
              maxTags={ 5 }
              mediaEntity={ trackEntity }
              streamTrackId={ streamTrackId }
              userEntity={ userEntity }
            /> }

          <WaypointLoader
            onEnter={ this.handleWaypointEnter }
            isFetching={ isFetching }
            hasMore={ !!next_href }
            waypointProps={{ className: 'waypoint' }}
            loaderProps={{ className: 'loader--bottom' }}
            endProps={{ className: 'end--bottom' }}
          />
        </div>
      </Main>
    )
  }
}

GalleryContainer.propTypes = {
  audioIsPlaying: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  likedTracks: React.PropTypes.object,
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

function mapStateToProps(state) {
  const { auth, entities, partition, media } = state.app

  return {
    likedTracks: auth.likes.tracks,

    trackEntity: entities.tracks,
    userEntity: entities.users,

    audioIsPlaying: media.player.audio.isPlaying,
    shouldPlay: media.stream.shouldPlay,
    streamTrackId: media.stream.trackId,

    searchesByInput: partition.searchesByInput,
    tracksByGenre: partition.tracksByGenre,
    tracksByTag: partition.tracksByTag
  }
}

const GalleryWrap = connect(mapStateToProps)(GalleryContainer)
GalleryWrap.needs = needs

export default GalleryWrap
