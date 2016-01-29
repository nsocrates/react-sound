import React from 'react'
import Collection from 'components/Collection'
import Main from 'components/Main'
import Waypoint from 'components/Waypoint'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IMG_FORMAT } from 'constants/ItemLists'
import { requestStream } from 'actions/stream'
import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { trackFactory } from 'utils/Utils'

export class MainContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  handleWaypointEnter() {
    const { actions, tracksByGenre, requested, searchesByInput } = this.props
    const { isFetching } = tracksByGenre[requested] || searchesByInput[requested]

    if (!isFetching) {
      const condition = tracksByGenre[requested]
      return condition ? actions.loadGenre(requested) : actions.loadSearch(requested)
    }
  }

  render() {
    const {
      actions,
      audioIsPlaying,
      requested,
      streamTrackId,
      tracksByGenre,
      searchesByInput,
      userEntity,
      trackEntity
    } = this.props
    const group = tracksByGenre[requested] || searchesByInput[requested]
    const { isFetching } = group

    // Render Collection
    const trackIds = group.ids
    const collection = trackIds.map((item, index) => {
      const args = {
        trackId: group.ids[index],
        userEntity,
        trackEntity
      }
      const trackData = trackFactory(args)
      const trackId = group.ids[index]
      const imgUrl = trackData.getArtwork(IMG_FORMAT.LARGE)
      const style = {
        backgroundImage: `url(${imgUrl}),
                          repeating-linear-gradient(
                            135deg,
                            #c6cde0,
                            #c6cde0 1.5rem,
                            #fff 1.5rem,
                            #fff 3rem
                          )`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
      return (
        <Collection
          actions={ actions }
          audioIsPlaying={ audioIsPlaying }
          componentClass="gallery"
          key={ trackId }
          streamTrackId={ streamTrackId }
          styles={ style }
          title={ trackData.songName }
          trackId={ trackId }
          user={ trackData.userName }
        />
      )
    })

    const shouldRenderWaypoint = () => {
      if (isFetching) {
        return (
          <div className="loader">
            <i className="fa fa-spinner fa-pulse" />
          </div>
        )
      }

      return (
        <Waypoint
          classNames="rw-waypoint"
          onEnter={ this.handleWaypointEnter }
        />
      )
    }

    return (
      <Main>
        { collection }
        { shouldRenderWaypoint() }
      </Main>
    )
  }
}

MainContainer.propTypes = {
  actions: React.PropTypes.shape(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool,
  requested: React.PropTypes.string,
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
    actions: bindActionCreators({ requestStream, loadGenre, loadSearch }, dispatch)
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

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
