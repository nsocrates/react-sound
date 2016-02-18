import React, { PropTypes } from 'react'
import Card from 'components/Card'
import Tag from 'components/Tag'
import Loader from 'components/Loader'
import End from 'components/End'
import { trackFactory } from 'utils/Utils'
import { IMG_FORMAT } from 'constants/ItemLists'
import { requestStream } from 'actions/stream'
import { loadUserTracks } from 'actions/user'

import { connect } from 'react-redux'

class UserTracksContainer extends React.Component {
  componentDidMount() {
    return this.updateComponent()
  }

  componentWillUnmount() {
    console.log('UserTracksContainer.WillUnmount')
  }

  updateComponent() {
    const { dispatch, params } = this.props

    return dispatch(loadUserTracks(params.id))
  }

  render() {
    const {
      requested,
      userEntity,
      trackEntity,
      tracksByUser,
      dispatch,
      params
    } = this.props

    const user = userEntity[params.id]

    if (!user || requested.isFetching) {
      return <Loader className="loader--bottom" />
    }

    const renderCards = () => {
      if (tracksByUser[user.id]) {
        const tracks = tracksByUser[user.id]
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
              imgUrl={ trackData.getArtwork(IMG_FORMAT.LARGE) }
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

    return (
      <section className="card">
        { renderCards() }
        <End className="end--bottom" />
      </section>
    )
  }
}

UserTracksContainer.propTypes = {
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  params: PropTypes.object,
  requested: PropTypes.object,
  streamTrackId: PropTypes.number,
  trackEntity: PropTypes.object,
  tracksByUser: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    requested,
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
    requested,
    tracksByUser,
    streamTrackId: trackId,
    trackEntity: tracks,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserTracksContainer)
