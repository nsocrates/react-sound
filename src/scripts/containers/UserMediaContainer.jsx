import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loader from 'components/Loader'
import MediaCards from 'components/MediaCards'
import WaypointLoader from 'components/WaypointLoader'

import { loadUserMedia } from 'actions/conditional'
import { fetchNeeds } from 'utils/fetchComponentData'

const needs = [loadUserMedia]

class UserMediaContainer extends React.Component {
  constructor(props) {
    super(props)
    const { userEntity, params } = props
    this.user = userEntity[params.id]
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent(this.props)
  }

  componentWillReceiveProps(nextProps) {
    return this.props.route !== nextProps.route
      && this.updateComponent(nextProps)
  }

  updateComponent(props, next) {
    const { dispatch, location, params } = props
    const { pathname, query } = location
    const locals = {
      pathname,
      query,
      params
    }

    return fetchNeeds(needs, dispatch, locals, next)
  }

  handleWaypointEnter() {
    return this.updateComponent(this.props, true)
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
            mediaEntity: trackEntity,
            none: 'USER DOES NOT HAVE ANY TRACKS.',
            partition: userTracks
          }

        case 'favorites':
          return {
            collection: trackCollection,
            mediaEntity: trackEntity,
            none: 'USER DOES NOT HAVE ANY FAVORITES.',
            partition: userFavorites
          }

        case 'playlists':
          return {
            collection: playlistCollection,
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
      mediaEntity,
      none,
      partition
    } = getEntity()

    const { isFetching, next_href, offset } = partition

    if (!Object.keys(partition).length || isFetching && !next_href) {
      return <Loader className="loader--bottom" />
    }

    return (
      <div>
        <MediaCards
          className="cards"
          collectionIds={ collection.ids }
          endMsg={ none }
          hasLoaded={ offset > 0 }
          ids={ partition.ids }
          isPlaying={ isPlaying }
          maxTags={ 5 }
          mediaEntity={ mediaEntity }
          streamTrackId={ streamTrackId }
          userEntity={ userEntity }
        />
        { !!partition.ids.length &&
          <WaypointLoader
            endProps={{ className: 'end--bottom' }}
            hasMore={ !!next_href }
            isFetching={ isFetching }
            loaderProps={{ className: 'loader--bottom' }}
            onEnter={ this.handleWaypointEnter }
            waypointProps={{ className: 'waypoint' }}
          /> }
      </div>
    )
  }
}

UserMediaContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  playlistCollection: PropTypes.object.isRequired,
  playlistEntity: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  streamTrackId: PropTypes.number.isRequired,
  trackCollection: PropTypes.object.isRequired,
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
    auth: { likes },
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
    trackCollection: likes.tracks,
    playlistCollection: likes.playlists
  }
}

const UserMediaWrap = connect(mapStateToProps)(UserMediaContainer)
UserMediaWrap.needs = needs

export default UserMediaWrap
