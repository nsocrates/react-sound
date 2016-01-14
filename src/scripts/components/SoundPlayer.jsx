import React from 'react'
import classNames from 'classnames'

export default class SoundPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleFastBackward = this.handleFastBackward.bind(this)
    this.handleFastForward = this.handleFastForward.bind(this) // TODO
    this.handleVolume = this.handleVolume.bind(this) // TODO
    this.handleMenu = this.handleMenu.bind(this) // TODO
  }

  handleToggle() {
    const { streamIsPlaying, audioRef: { _audio }} = this.props

    return streamIsPlaying ? _audio.pause() : _audio.play()
  }

  handleFastBackward() {
    const { audioRef: { _audio }} = this.props

    if (_audio.currentTime > 0) {
      _audio.currentTime = 0
    } else {
      // Play previous
      return
    }
  }

  handleFastForward() {
    return
  }

  handleVolume() {
    return
  }

  handleMenu() {
    return
  }

  render() {
    const { streamCanPlay, streamIsPlaying } = this.props
    const musicPlayer = classNames('music-player', { 'is-open': streamCanPlay })
    const toggleStream = classNames('fa', {
      'fa-pause': streamIsPlaying,
      'fa-play': !streamIsPlaying
    })

    return (
      <section className={ musicPlayer }>
        { this.props.children }
        <div className="container">
          <div className="mp-controls">
            <h4 className="mp-hgroup">
              <i className="fa fa-bars" />
              <i
                className="fa fa-fast-backward"
                onClick={ this.handleFastBackward }
              />
              <i
                className={ toggleStream }
                onClick={ this.handleToggle }
              />
              <i className="fa fa-fast-forward" />
              <i className="fa fa-volume-up" />
            </h4>
          </div>
        </div>
      </section>
    )
  }
}

SoundPlayer.propTypes = {
  // actions: React.PropTypes.objectOf(
  //   React.PropTypes.func
  // ),
  audioRef: React.PropTypes.shape({
    _audio: React.PropTypes.object.isRequired
  }),
  children: React.PropTypes.node,
  streamCanPlay: React.PropTypes.bool,
  streamIsPlaying: React.PropTypes.bool
  // trackId: React.PropTypes.number
}
