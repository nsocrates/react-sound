import React, { PropTypes } from 'react'
import Card from 'components/Card'
import End from 'components/End'
import Loader from 'components/Loader'
import Tag from 'components/Tag'
import Waypoint from 'components/Waypoint'
import { IMG_FORMAT } from 'constants/ItemLists'
import { loadUserTracks } from 'actions/user'
import { requestStream } from 'actions/stream'
import { trackFactory } from 'utils/Utils'

import { connect } from 'react-redux'

class UserTracksContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
  }

  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent(next) {
    const { dispatch, params } = this.props

    return dispatch(loadUserTracks(params.id, next))
  }

  handleWaypointEnter() {
    const { tracksByUser, params } = this.props
    const tracks = tracksByUser[params.id]

    if (!tracks.isFetching) {
      return this.updateComponent(true)
    }
  }

  render() {
    const {
      userEntity,
      trackEntity,
      tracksByUser,
      dispatch,
      params
    } = this.props

    const user = userEntity[params.id]
    const tracks = tracksByUser[params.id]

    if (!user) {
      return <Loader className="loader--bottom" />
    }

    const renderCards = () => {
      if (tracks) {
        const { ids } = tracks

        return ids.map((item, index) => {
          const obj = {
            userEntity,
            trackEntity,
            trackId: item
          }
          const trackData = trackFactory(obj)

          const _renderTags = () => {
            if (trackData.tags) {
              return trackData.tags.map((tag, idx) => {
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

            if (trackData.track.id === streamTrackId) {
              return isPlaying ? audio.pause() : audio.play()
            }

            return dispatch(requestStream(trackData.track.id))
          }

          return (
            <Card
              byline={ trackData.user.name }
              date={ `Created ${trackData.createdAt}` }
              imgUrl={ trackData.artwork.large }
              key={ `user_card__${index}_${item}` }
              onCoverClick={ _handleCoverClick }
              title={ trackData.track.name }
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

UserTracksContainer.propTypes = {
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  params: PropTypes.object,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    entities: { users, tracks },
    partition: { tracksByUser },
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
    streamTrackId: trackId,
    trackEntity: tracks,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserTracksContainer)
