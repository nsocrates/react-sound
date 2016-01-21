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
    const { componentClass, style } = this.props

    return (
      <a
        className={ componentClass }
        href="#"
        onClick={ this.handleClick }
        style={ style }
      />
    )
  }
}

Collection.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  audioIsPlaying: React.PropTypes.bool.isRequired,
  componentClass: React.PropTypes.string,
  streamIsPlaying: React.PropTypes.bool,
  streamTrackId: React.PropTypes.number,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  trackId: React.PropTypes.number.isRequired
}

Collection.defaultProps = {
  componentClass: null,
  style: null
}
