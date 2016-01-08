import React from 'react'
import flatten from 'lodash/array/flatten'

export default class Main extends React.Component {

  constructor(props) {
    super(props)
  }

  getCurrentCollection() {
    const { requested, tracksByGenre } = this.props

    if (tracksByGenre.hasOwnProperty(requested)) {
      const reqTracksIdList = this.integerToString(tracksByGenre[requested].ids)
      const collection = this.getTrackArtwork(reqTracksIdList)

      return this.renderCollection(flatten(collection))
    }
  }

  getTrackArtwork(tracksIdList) {
    const { trackEntity } = this.props
    const artworkList = []
    let placeholder

    for (const i of tracksIdList) {
      if (trackEntity[i].artwork_url) {
        placeholder = trackEntity[i].artwork_url.replace(/large/gi, 'crop')
      } else if (trackEntity[i].user === trackEntity[i].user_id) {
        placeholder = this.getUserAvatar([trackEntity[i].user])
      }

      artworkList.push(placeholder)
    }

    return artworkList
  }

  getUserAvatar(usersIdList) {
    const { userEntity } = this.props

    // SoundCloud parameter for default avatar
    const regex = /1452091084/g
    const avatarList = []
    let placeholder

    for (const i of usersIdList) {
      if (regex.test(userEntity[i].avatar_url)) {
        placeholder = userEntity[i].avatar_url
      } else {
        placeholder = userEntity[i].avatar_url.replace(/large/gi, 'crop')
      }

      avatarList.push(placeholder)
    }

    return avatarList
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
    return collection.map((item, index) => (
        <div
          className="gallery"
          key={ index }
          style={ this.setBackground(item) }
        />
    ))
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
  requested: React.PropTypes.string.isRequired,

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
