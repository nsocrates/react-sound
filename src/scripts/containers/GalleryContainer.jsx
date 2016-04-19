import React from 'react'
import Gallery from 'components/Gallery'
import Loader from 'components/Loader'
import Main from 'components/Main'
import mediaFactory from 'utils/mediaFactory'
import WaypointLoader from 'components/WaypointLoader'
import { connect } from 'react-redux'
import { loadGallery } from 'actions/conditional'
import { requestStream } from 'actions/stream'
import { fetchNeeds } from 'utils/fetchComponentData'

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
      streamTrackId,
      userEntity,
      trackEntity,
      shouldPlay
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

    if (!Object.keys(collection).length) {
      return <Loader className="loader--top" />
    }

    const { isFetching, next_href } = collection

    // Render Gallery
    const renderGallery = () => {
      const ids = collection.ids
      const gallery = ids.map((trackId, index) => {
        const args = {
          userObject: userEntity[trackEntity[trackId].user_id],
          mediaObject: trackEntity[trackId]
        }
        const trackData = mediaFactory(args)
        const { dispatch } = this.props
        const { media } = trackData

        function handleRequestStream(e) {
          e.preventDefault()
          const audio = document.getElementById('audio')

          if (media.id === streamTrackId) {
            return audioIsPlaying ? audio.pause() : audio.play()
          }

          return dispatch(requestStream(media.id))
        }

        return (
          <Gallery
            key={ `${trackId}_${index}` }
            onRequestStream={ handleRequestStream }
            trackData={ trackData }
          />
        )
      })
      return gallery
    }

    return (
      <Main
        className="main main__collection"
        shouldPush={ shouldPlay }
      >
        <div className="main__container">
          { renderGallery() }
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
  const { entities, partition, media } = state.app

  return {
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
