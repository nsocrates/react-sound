import React from 'react'

export default class Collection extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { actions, trackId, streamTrackId, streamIsPlaying } = this.props
    const audio = document.getElementById('audio')
    e.preventDefault()

    if (trackId === streamTrackId) {
      return streamIsPlaying ? audio.pause() : audio.play()
    }

    return actions.requestStream(trackId)
  }

  render() {
    const { className, style } = this.props

    return (
      <a
        className={ className }
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
  className: React.PropTypes.string,
  streamIsPlaying: React.PropTypes.bool,
  streamTrackId: React.PropTypes.number,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  trackId: React.PropTypes.number.isRequired
}

Collection.defaultProps = {
  className: null,
  style: null
}
