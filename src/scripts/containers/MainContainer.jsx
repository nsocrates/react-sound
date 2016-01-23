import React from 'react'
import Collection from 'components/Collection'
import Main from 'components/Main'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestStream } from 'actions/stream'

export default class MainContainer extends React.Component {

  getCollection(trackIds) {
    const { trackEntity, userEntity } = this.props

    return trackIds.map(item => {
      if (!trackEntity[item].artwork_url) {
        const user_id = trackEntity[item].user_id
        return userEntity[user_id].avatar_url
      }

      return trackEntity[item].artwork_url
    })
  }

  render() {
    const {
      actions,
      audioIsPlaying,
      requested,
      streamTrackId,
      tracksByGenre
    } = this.props

    const collection = this.getCollection(tracksByGenre[requested].ids)

    return (
      <Main { ...this.props }>
        { collection.map((item, index) => {
          const trackId = tracksByGenre[requested].ids[index]
          const style = {
            background: `url(${item}) no-repeat center center / cover`
          }
          return (
            <Collection
              actions={ actions }
              audioIsPlaying={ audioIsPlaying }
              componentClass="gallery"
              key={ trackId }
              streamTrackId={ streamTrackId }
              style={ style }
              trackId={ trackId }
            />
          )
        })}
      </Main>
    )
  }
}

MainContainer.propTypes = {
  actions: React.PropTypes.shape({
    requestStream: React.PropTypes.func.isRequired
  }),
  audioIsPlaying: React.PropTypes.bool,
  requested: React.PropTypes.string,
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
    actions: bindActionCreators({ requestStream }, dispatch)
  }
}

function mapStateToProps(state) {
  const { entities, requested, partition, media } = state.app

  return {
    audioIsPlaying: media.player.audio.isPlaying,
    requested,
    streamTrackId: media.stream.trackId,
    trackEntity: entities.tracks,
    tracksByGenre: partition.tracksByGenre,
    userEntity: entities.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
