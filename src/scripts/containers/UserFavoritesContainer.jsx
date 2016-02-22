import React, { PropTypes } from 'react'
import Card from 'components/Card'
import End from 'components/End'
import Loader from 'components/Loader'
import Tag from 'components/Tag'
import Waypoint from 'components/Waypoint'
import { loadUserFavorites } from 'actions/user'
import { requestStream } from 'actions/stream'
import { trackFactory } from 'utils/Utils'

import { connect } from 'react-redux'

class UserFavoritesContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent(next) {
    const { dispatch, params } = this.props

    return dispatch(loadUserFavorites(params.id, next))
  }

  handleWaypointEnter() {
    const { favoritesByUser, params } = this.props
    const tracks = favoritesByUser[params.id]

    if (!tracks.isFetching) {
      return this.updateComponent(true)
    }
  }

  render() {
    const {
      userEntity,
      trackEntity,
      favoritesByUser,
      dispatch,
      params
    } = this.props

    const user = userEntity[params.id]
    const tracks = favoritesByUser[params.id]

    if (!user || !tracks) {
      return <Loader className="loader--bottom" />
    }

    const renderCards = () => {
      if (tracks) {
        const { ids } = tracks

        return ids.map((item, index) => {
          const obj = {
            userEntity,
            mediaEntity: trackEntity,
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

          const _handleCoverClick = e => {
            e.preventDefault()

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
              dispatch={ dispatch }
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
    }

    const shouldRenderWaypoint = () => {
      if (tracks.next_href) {
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
        { tracks.isFetching ? <Loader className="loader--bottom"/> : shouldRenderWaypoint() }
        { !tracks.next_href && !tracks.isFetching ? <End className="end--bottom" /> : null }
      </section>
    )
  }
}

UserFavoritesContainer.propTypes = {
  dispatch: PropTypes.func,
  favoritesByUser: PropTypes.object,
  isPlaying: PropTypes.bool,
  params: PropTypes.object,
  route: PropTypes.object,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    entities: { users, tracks },
    partition: { favoritesByUser },
    media: {
      stream: { trackId },
      player: {
        audio: { isPlaying }
      }
    }
  } = state.app

  return {
    isPlaying,
    favoritesByUser,
    streamTrackId: trackId,
    trackEntity: tracks,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserFavoritesContainer)
