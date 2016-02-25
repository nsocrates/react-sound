import React, { PropTypes } from 'react'
import Card from 'components/Card'
import End from 'components/End'
import Loader from 'components/Loader'
import Tag from 'components/Tag'
import Waypoint from 'components/Waypoint'
import { loadUserTracks, loadUserFavorites, loadUserPlaylists } from 'actions/user'
import { requestStream } from 'actions/stream'
import { pushTrack } from 'actions/player'
import { trackFactory } from 'utils/Utils'

import { connect } from 'react-redux'

class UserMediaContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route !== nextProps.route) {
      return this.updateComponent(nextProps.route.path)
    }
  }

  updateComponent(path, next) {
    const { dispatch, params, route } = this.props
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
      params,
      route
    } = this.props

    const getEntity = () => {
      const { tracksByUser, favoritesByUser, playlistsByUser } = this.props
      let mediaObject = {
        entity: null,
        partition: null
      }

      switch (route.path) {

        case 'tracks':
          mediaObject = {
            entity: trackEntity,
            partition: tracksByUser[params.id]
          }
          return mediaObject

        case 'favorites':
          mediaObject = {
            entity: trackEntity,
            partition: favoritesByUser[params.id]
          }
          return mediaObject

        case 'playlists':
          mediaObject = {
            entity: playlistEntity,
            partition: playlistsByUser[params.id]
          }
          return mediaObject

        default:
          return mediaObject
      }
    }

    // const user = userEntity[params.id]
    const media = getEntity()
    const { entity, partition } = media

    if (/*!user || */!partition) {
      return <Loader className="loader--bottom" />
    }

    const renderCards = () => {
      const { ids } = partition

      return ids.map((item, index) => {
        const obj = {
          userEntity,
          mediaEntity: entity,
          id: item
        }
        const mediaData = trackFactory(obj)

        const _renderTags = () => {
          if (mediaData.tags) {
            return mediaData.tags.map((tag, idx) => {
              if (idx < 5) {
                return (
                  <Tag
                    key={`tag__${idx}_${tag}`}
                    text={ tag }
                  />
                )
              }
            })
          }
        }

        const _isPlaylist = () => {
          dispatch(requestStream(mediaData.tracklist[0]))
          dispatch(pushTrack(mediaData.tracklist, mediaData.kind))
        }

        const _handleCoverClick = e => {
          e.preventDefault()

          if (route.path === 'playlists') {
            return _isPlaylist()
          }

          const { isPlaying, streamTrackId } = this.props
          const audio = document.getElementById('audio')

          if (mediaData.media.id === streamTrackId) {
            return isPlaying ? audio.pause() : audio.play()
          }

          return dispatch(requestStream(mediaData.media.id))
        }

        return (
          <Card
            byline={ mediaData.user.name }
            bylinePath={ `#user/${mediaData.user.id}` }
            date={ `Created ${mediaData.createdAt}` }
            imgUrl={ mediaData.artwork.large }
            key={ `user_card__${index}_${item}` }
            onCoverClick={ _handleCoverClick }
            title={ mediaData.media.name }
          >
            <ul className="tags">
              { _renderTags() }
            </ul>
          </Card>
        )
      })
    }

    const shouldRenderWaypoint = () => {
      if (partition.next_href) {
        return (
          <Waypoint
            className="waypoint waypoint--bottom"
            onEnter={ this.handleWaypointEnter }
          />
        )
      }
    }

    return (
      <section className="card">
        { renderCards() }
        { partition.isFetching ? <Loader className="loader--bottom"/> : shouldRenderWaypoint() }
        { !partition.next_href && !partition.isFetching ? <End className="end--bottom" /> : null }
      </section>
    )
  }
}

UserMediaContainer.propTypes = {
  dispatch: PropTypes.func,
  favoritesByUser: PropTypes.object,
  isPlaying: PropTypes.bool,
  location: PropTypes.object,
  params: PropTypes.object,
  playlistEntity: PropTypes.object,
  playlistsByUser: PropTypes.object,
  route: PropTypes.object,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
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

  return {
    isPlaying,
    tracksByUser,
    favoritesByUser,
    playlistsByUser,
    streamTrackId: trackId,
    userEntity: users,
    trackEntity: tracks,
    playlistEntity: playlists
  }
}

export default connect(mapStateToProps)(UserMediaContainer)
