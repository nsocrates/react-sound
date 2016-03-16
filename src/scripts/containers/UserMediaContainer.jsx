import React, { PropTypes } from 'react'
import Card from 'components/Card'
import End from 'components/End'
import Loader from 'components/Loader'
import Taglist from 'components/Taglist'
import Waypoint from 'components/Waypoint'
import { loadUserTracks, loadUserFavorites, loadUserPlaylists } from 'actions/user'
import { requestStream, loadStreamList } from 'actions/stream'
import { trackFactory } from 'utils/Utils'

import { connect } from 'react-redux'

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
      userEntity,
      trackEntity,
      playlistEntity,
      dispatch,
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
            mediaEntity: trackEntity,
            partition: userTracks,
            hasItems: !!this.user.track_count,
            none: 'USER DOES NOT HAVE ANY TRACKS'
          }

        case 'favorites':
          return {
            mediaEntity: trackEntity,
            partition: userFavorites,
            hasItems: !!this.user.public_favorites_count,
            none: 'USER DOES NOT HAVE ANY FAVORITES'
          }

        case 'playlists':
          return {
            mediaEntity: playlistEntity,
            partition: userPlaylists,
            hasItems: !!this.user.playlist_count,
            none: 'USER DOES NOT HAVE ANY PLAYLISTS'
          }

        default:
          return {}
      }
    }

    const {
      mediaEntity,
      partition,
      hasItems,
      none
    } = getEntity()

    if (!Object.keys(partition).length) {
      return <Loader className="loader--bottom" />
    }

    if (!hasItems && !partition.ids.length) {
      return <End className="end--bottom" text={ none } />
    }

    const renderCards = () => {
      const { ids } = partition
      return ids.map((item, index) => {
        const obj = {
          userObject: userEntity[mediaEntity[item].user_id],
          mediaObject: mediaEntity[item]
        }
        const mediaData = trackFactory(obj)

        const _handleCoverClick = e => {
          e.preventDefault()

          if (route.path === 'playlists') {
            return dispatch(loadStreamList(mediaData.tracklist.ids))
          }

          const { isPlaying, streamTrackId } = this.props
          const audio = document.getElementById('audio')

          if (mediaData.media.id === streamTrackId) {
            return isPlaying ? audio.pause() : audio.play()
          }

          return dispatch(requestStream(mediaData.media.id))
        }

        const mediaPath = route.path === 'playlists'
                            ? `#playlist/${mediaData.media.id}`
                            : `#track/${mediaData.media.id}`

        return (
          <Card
            byline={ mediaData.user.name }
            bylinePath={ `#user/${mediaData.user.id}` }
            date={ `Created ${mediaData.createdAt}` }
            imgUrl={ mediaData.artwork.large }
            key={ `user_card__${index}_${item}` }
            onCoverClick={ _handleCoverClick }
            title={ mediaData.media.name }
            titlePath={ mediaPath }
          >
            <Taglist max={ 5 } tags={ mediaData.tags } />
          </Card>
        )
      })
    }

    const shouldRenderWaypoint = () => {
      if (partition.isFetching) {
        return <Loader className="loader--bottom" />
      }

      if (!partition.next_href) {
        return <End className="end--bottom" />
      }

      return (
        <Waypoint
          className="waypoint waypoint--bottom"
          onEnter={ this.handleWaypointEnter }
        />
      )
    }

    return (
      <section className="card">
        { renderCards() }
        { shouldRenderWaypoint() }
      </section>
    )
  }
}

UserMediaContainer.propTypes = {
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
    playlistEntity: playlists
  }
}

export default connect(mapStateToProps)(UserMediaContainer)
