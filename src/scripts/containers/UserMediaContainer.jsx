import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loader from 'components/Loader'
import MediaCards from 'components/MediaCards'
import WaypointLoader from 'components/WaypointLoader'

import { loadUserTracks, loadUserFavorites, loadUserPlaylists } from 'actions/user'

class UserMediaContainer extends React.Component {

  constructor(props) {
    super(props)
    const { userEntity, params } = props
    this.user = userEntity[params.id]
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route !== nextProps.route) {
      return this.updateComponent(nextProps.route.path)
    }

    return null
  }

  updateComponent(path, next) {
    const {
      dispatch,
      params,
      route
    } = this.props

    const pathName = path || route.path

    switch (pathName) {
      case 'tracks':
        return dispatch(loadUserTracks(params.id, next))
      case 'favorites':
        return dispatch(loadUserFavorites(params.id, next))
      case 'playlists':
        return dispatch(loadUserPlaylists(params.id, next))
      default:
        return null
    }
  }

  handleWaypointEnter() {
    return this.updateComponent(null, true)
  }

  render() {
    const {
      isPlaying,
      streamTrackId,
      userEntity,
      trackEntity,
      playlistEntity,
      trackCollection,
      playlistCollection,
      route
    } = this.props

    const getEntity = () => {
      const {
        userTracks,
        userFavorites,
        userPlaylists
      } = this.props

      switch (route.path) {
        case 'tracks':
          return {
            collection: trackCollection,
            isPlaylist: false,
            mediaEntity: trackEntity,
            none: 'USER DOES NOT HAVE ANY TRACKS.',
            partition: userTracks
          }

        case 'favorites':
          return {
            collection: trackCollection,
            isPlaylist: false,
            mediaEntity: trackEntity,
            none: 'USER DOES NOT HAVE ANY FAVORITES.',
            partition: userFavorites
          }

        case 'playlists':
          return {
            collection: playlistCollection,
            isPlaylist: true,
            mediaEntity: playlistEntity,
            none: 'USER DOES NOT HAVE ANY PLAYLISTS.',
            partition: userPlaylists
          }

        default:
          return {}
      }
    }

    const {
      collection,
      isPlaylist,
      mediaEntity,
      none,
      partition
    } = getEntity()

    const { isFetching, next_href, offset } = partition

    if (!Object.keys(partition).length || isFetching && !next_href) {
      return <Loader className="loader--bottom" />
    }

    return (
      <MediaCards
        className="cards"
        collectionIds={ collection.ids }
        endMsg={ none }
        hasLoaded={ offset !== -1 }
        ids={ partition.ids }
        isPlaying={ isPlaying }
        isPlaylist={ isPlaylist }
        maxTags={ 5 }
        mediaEntity={ mediaEntity }
        streamTrackId={ streamTrackId }
        userEntity={ userEntity }
      >
        <WaypointLoader
          endProps={{ className: 'end--bottom' }}
          hasMore={ !!next_href }
          isFetching={ isFetching }
          loaderProps={{ className: 'loader--bottom' }}
          onEnter={ this.handleWaypointEnter }
          waypointProps={{ className: 'waypoint waypoint--bottom' }}
        />
      </MediaCards>
    )
  }
}

UserMediaContainer.propTypes = {
  trackCollection: PropTypes.object.isRequired,
  playlistCollection: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  playlistEntity: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  streamTrackId: PropTypes.number.isRequired,
  trackEntity: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired,
  userFavorites: PropTypes.object.isRequired,
  userPlaylists: PropTypes.object.isRequired,
  userTracks: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    entities: { users, tracks, playlists },
    partition: { tracksByUser, favoritesByUser, playlistsByUser },
    auth: { collection },
    media: {
      stream: { trackId },
      player: {
        audio: { isPlaying }
      }
    }
  } = state.app
  const { params: { id } } = ownProps

  return {
    isPlaying,
    userTracks: tracksByUser[id] || {},
    userFavorites: favoritesByUser[id] || {},
    userPlaylists: playlistsByUser[id] || {},
    streamTrackId: trackId,
    userEntity: users,
    trackEntity: tracks,
    playlistEntity: playlists,
    trackCollection: collection.tracks,
    playlistCollection: collection.playlists
  }
}

export default connect(mapStateToProps)(UserMediaContainer)
