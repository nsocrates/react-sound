import React, { PropTypes } from 'react'
import Card from 'components/Card'
import Tag from 'components/Tag'
import Loader from 'components/Loader'
import End from 'components/End'
import { trackFactory } from 'utils/Utils'
import { IMG_FORMAT } from 'constants/ItemLists'
import { requestStream } from 'actions/stream'

import UserContainer from 'containers/UserContainer'

import { connect } from 'react-redux'

class UserTracks extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('UserTracks.DidMount')
    console.log(this.props)
  }

  render() {
    return <div />
  }

/*
  render() {
    const {
      dispatch,
      tracks,
      ids,
      userEntity,
      trackEntity,
      isPlaying,
      streamTrackId
    } = this.props

    const renderCards = () => (
        ids.map((item, index) => {
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

            // const { isPlaying, streamTrackId } = this.props
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
      // }
    )

    return (
      <section className="card">
        { renderCards() }
      </section>
    )
  }
*/
}

export default connect()(UserTracks)
