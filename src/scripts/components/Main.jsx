import React from 'react'
import Collection from './Collection'

export default class Main extends React.Component {

  getCurrentCollection() {
    const { requested, tracksByGenre } = this.props

    if (tracksByGenre.hasOwnProperty(requested)) {
      const reqTracksIdList = this.integerToString(tracksByGenre[requested].ids)
      const collection = this.getCollectionToRender(reqTracksIdList)

      return this.renderCollection(collection)
    }
  }

  getCollectionToRender(tracksIdList) {
    const { trackEntity, userEntity } = this.props
    const collection = []
    let placeholder

    for (const i of tracksIdList) {
      if (trackEntity[i].artwork_url) {
        placeholder = trackEntity[i].artwork_url
      } else if (trackEntity[i].user === trackEntity[i].user_id) {
        const userId = trackEntity[i].user
        placeholder = userEntity[userId].avatar_url
      }

      collection.push(placeholder)
    }

    return collection
  }

  setBackground(url) {
    if (url) {
      return ({
        background: `url(${url}) no-repeat center center`,
        backgroundSize: 'cover'
      })
    }
  }

  integerToString(array) {
    return array.map(item =>
      item.toString(10)
    )
  }

  renderCollection(collection) {
    const { tracksByGenre, requested, streamIsPlaying, loadStream } = this.props

    return collection.map((item, index) => {
      const trackId = tracksByGenre[requested].ids[index]

      return (
        <Collection
          className="gallery"
          key={ index }
          loadStream={ loadStream }
          streamIsPlaying={ streamIsPlaying }
          style={ this.setBackground(item) }
          trackId={ trackId }
          trackIndex={ index }
        />
      )
    })
  }

  render() {
    return (
      <main
        className="main"
        id="main"
      >
        <div className="container">
          { this.getCurrentCollection() }
        </div>
      </main>
    )
  }
}

Main.propTypes = {
  loadStream: React.PropTypes.func.isRequired,
  requested: React.PropTypes.string.isRequired,
  streamIsPaused: React.PropTypes.bool,
  streamIsPlaying: React.PropTypes.bool.isRequired,
  streamTrackId: React.PropTypes.number.isRequired,
  toggleStream: React.PropTypes.func,

  trackEntity: React.PropTypes.objectOf(
    React.PropTypes.shape({
      artwork_url: React.PropTypes.oneOfType([
        React.PropTypes.string.isRequired,
        React.PropTypes.object
      ])
    })
  ),

  tracksByGenre: React.PropTypes.objectOf(
    React.PropTypes.shape({
      ids: React.PropTypes.arrayOf(React.PropTypes.number.isRequired)
    })
  ),

  userEntity: React.PropTypes.objectOf(
    React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired
    })
  )
}
