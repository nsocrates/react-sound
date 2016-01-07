import React from 'react'
import flatten from 'lodash/array/flatten'

export default class Main extends React.Component {

  constructor(props) {
    super(props)
  }

  getCurrentCollection() {
    const { requested, partition: { tracksByGenre }} = this.props

    if (tracksByGenre.hasOwnProperty(requested)) {
      const reqTracksIdList = this.integerToString(tracksByGenre[requested].ids)
      const collection = this.getTrackArtwork(reqTracksIdList)

      return this.renderCollection(flatten(collection))
    }
  }

  getTrackArtwork(tracksIdList) {
    const { entities: { tracks: tracksEntity }} = this.props
    const artworkList = []
    let placeholder

    for (const i of tracksIdList) {
      if (tracksEntity[i].artwork_url) {
        placeholder = tracksEntity[i].artwork_url.replace(/large/gi, 'crop')
      } else if (tracksEntity[i].user === tracksEntity[i].user_id) {
        placeholder = this.getUserAvatar([tracksEntity[i].user])
      }

      artworkList.push(placeholder)
    }

    return artworkList
  }

  getUserAvatar(usersIdList) {
    const { entities: { users: usersEntity }} = this.props

    // SoundCloud parameter for default avatar
    const regex = /1452091084/g
    const avatarList = []
    let placeholder

    for (const i of usersIdList) {
      if (regex.test(usersEntity[i].avatar_url)) {
        placeholder = usersEntity[i].avatar_url
      } else {
        placeholder = usersEntity[i].avatar_url.replace(/large/gi, 'crop')
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
  entities: React.PropTypes.shape({
    tracks: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }),
  partition: React.PropTypes.shape({
    playlistByUser: React.PropTypes.object,
    tracksByGenre: React.PropTypes.object.isRequired
  }),
  requested: React.PropTypes.string.isRequired
}
