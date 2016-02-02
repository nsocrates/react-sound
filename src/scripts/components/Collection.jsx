import React from 'react'

export default class Collection extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { actions, trackId, streamTrackId, audioIsPlaying } = this.props
    const audio = document.getElementById('audio')
    e.preventDefault()

    if (trackId === streamTrackId) {
      return audioIsPlaying ? audio.pause() : audio.play()
    }

    return actions.requestStream(trackId)
  }

  render() {
    const { componentClass, styles, title, user } = this.props

    return (
      <div className={ componentClass }>
        <a
          className="gallery__artwork"
          href="#"
          onClick={ this.handleClick }
          style={ styles }
        />
        <div className="gallery__track">
          <h6 className="gallery__track--title">{ title }</h6>
          <h6 className="gallery__track--user">{ user }</h6>
        </div>
      </div>
    )
  }
}

Collection.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool.isRequired,
  componentClass: React.PropTypes.string,
  streamTrackId: React.PropTypes.number,
  styles: React.PropTypes.objectOf(React.PropTypes.string),
  title: React.PropTypes.string,
  trackId: React.PropTypes.number,
  user: React.PropTypes.string
}

Collection.defaultProps = {
  componentClass: null,
  style: null,
  title: 'Track Title',
  trackId: null,
  user: 'Track User'
}
