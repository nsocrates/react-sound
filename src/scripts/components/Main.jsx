import React from 'react'

export default class Main extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = { requested: this.props.requested }
  // }

  // componentWillReceiveProps(prevProps) {
  //   this.setState({ requested: prevProps.requested })
  //   this.getCurrentTrackIds(prevProps)
  // }

  convertInt(int) {
    return int.map(item =>
      item.toString(10)
    )
  }

  getCurrentCollection(props) {
    const tracksByGenre = props.partition.tracksByGenre
    const requested = props.requested
    const tracksEntity = props.entities.tracks
    // const trackEntityIds = Reflect.ownKeys(props.entities.tracks)
    const collection = []
    let placeholder

    if (tracksByGenre.hasOwnProperty(requested)) {
      const requestedIds = this.convertInt(tracksByGenre[requested].ids)
      // collection = this.mapCollection(requestedIds, props.entities.tracks)
      for (const i of requestedIds) {
        if (tracksEntity[i].artwork_url) {
          placeholder = tracksEntity[i].artwork_url.replace(/large/gi, 'crop')
          collection.push(placeholder)
        } else {
          collection.push(null)
        }
      }
      // collection = this.findMatch(trackEntityIds, requestedIds, props)
    }

    return this.renderCollection(collection)
  }

  // mapCollection(collection, entity) {
  //   return collection.map(item => (
  //     entity[item].artwork_url ? entity[item].artwork_url.replace(/large/gi, 'crop') : null
  //   ))
  // }

  renderCollection(collection) {
    return collection.map((item, index) => (
        <div
          className="gallery"
          key={ index }
          style={ this.setStyle(item) }
        />
    ))
  }

  setStyle(style) {
    if (style) {
      return ({
        background: `url(${style}) no-repeat center center`,
        backgroundSize: 'cover'
      })
    }
  }

  // findMatch(entity, requested, props) {
  //   requested.map(item => (
  //     entity.filter(this.filterCollection, item)
  //   ))
  // }

  // filterCollection(item) {
  //   return item.indexOf(this) === 0
  // }

  render() {
    return (
      <main
        className="main"
        id="main"
      >
        <div className="container">
          { this.getCurrentCollection(this.props) }
        </div>
      </main>
    )
  }
}

// Main.propTypes = {
//   requested: React.PropTypes.string
// }
