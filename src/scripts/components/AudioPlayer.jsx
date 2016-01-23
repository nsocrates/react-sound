/*eslint no-console:0 */

import React from 'react'
import classNames from 'classnames'
import Button from './Button'

export default class AudioPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.handlePlayPause = this.handlePlayPause.bind(this)
    this.handleMute = this.handleMute.bind(this)
    this.handleVolumeEnter = this.handleVolumeEnter.bind(this)
    this.handleVolumeLeave = this.handleVolumeLeave.bind(this)
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this)
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this)
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this)
    this.handleProgressMouseDown = this.handleProgressMouseDown.bind(this)
    this.handleProgressMouseMove = this.handleProgressMouseMove.bind(this)
    this.handleProgressMouseUp = this.handleProgressMouseUp.bind(this)
  }

  // Determines volume level based on cursor's Y position:
  getSliderValue(e) {
    const { _range } = this
    const { clientY } = e
    const { height, bottom } = _range.getBoundingClientRect()

    // Calculate value ( [max - min] / size )
    const value = (bottom - clientY) / height

    // Round 2 decimal places
    return Math.round(value * 1e2) / 1e2
  }

  getProgressValue(e) {
    const { _position } = this
    const { clientX } = e
    const { width, left } = _position.getBoundingClientRect()
    const value = (clientX - left) / width

    return Math.round(value * 1e2) / 1e2
  }

  clipNumber(num, min, max) {
    return Math.min(Math.max(num, min), max)
  }

  handlePlayPause() {
    const { player: { audio }, audioRef: { _audio }} = this.props
    return audio.isPlaying ? _audio.pause() : _audio.play()
  }

  handleMute() {
    const { player: { volume }, audioRef: { _audio }} = this.props

    _audio.muted = !volume.isMuted
  }

  handleProgressMouseDown(e) {
    e.preventDefault()
    const { playerActions, player: { audio }} = this.props
    const value = this.getProgressValue(e)
    const position = value * audio.duration

    this.bindEventListeners()
    playerActions.seekPosition(true, position)
  }

  handleProgressMouseMove(e) {
    e.preventDefault()
    const { playerActions, player: { audio }} = this.props

    if (!audio.isSeeking) {
      return
    }

    const value = this.getProgressValue(e)
    const position = this.clipNumber(value * audio.duration, 0, audio.duration)

    playerActions.seekPosition(true, position)
  }

  handleProgressMouseUp(e) {
    e.preventDefault()
    const { playerActions, player: { audio }, audioRef: { _audio }} = this.props

    const value = this.getProgressValue(e)
    const position = this.clipNumber(value * audio.duration, 0, audio.duration)

    _audio.currentTime = position
    this.unbindEventListeners()
    playerActions.seekPosition(false, position)
  }

  handleVolumeEnter() {
    const { playerActions } = this.props
    playerActions.expandVolume(true)
  }

  handleVolumeLeave() {
    const { playerActions } = this.props
    playerActions.expandVolume(false)
  }

  handleVolumeMouseDown(e) {
    e.preventDefault()
    const { playerActions, audioRef: { _audio }} = this.props
    const value = this.getSliderValue(e)
    _audio.volume = this.clipNumber(value, 0, 1)
    _audio.muted = false

    this.bindEventListeners('volume')
    playerActions.dragVolume(true)
  }

  handleVolumeMouseMove(e) {
    e.preventDefault()
    const { player: { volume }, audioRef: { _audio }} = this.props

    if (!volume.isDragging) {
      return
    }

    const value = this.getSliderValue(e)
    _audio.volume = this.clipNumber(value, 0, 1)
  }

  handleVolumeMouseUp(e) {
    const { playerActions, audioRef: { _audio }} = this.props
    const value = this.getSliderValue(e)

    _audio.volume = this.clipNumber(value, 0, 1)
    this.unbindEventListeners('volume')
    playerActions.dragVolume(false)
  }

  bindEventListeners(listener) {
    const body = document.body
    if (listener === 'volume') {
      body.addEventListener('mousemove', this.handleVolumeMouseMove)
      body.addEventListener('mouseup', this.handleVolumeMouseUp)
    } else {
      body.addEventListener('mousemove', this.handleProgressMouseMove)
      body.addEventListener('mouseup', this.handleProgressMouseUp)
    }
  }

  unbindEventListeners(listener) {
    const body = document.body
    if (listener === 'volume') {
      body.removeEventListener('mousemove', this.handleVolumeMouseMove)
      body.removeEventListener('mouseup', this.handleVolumeMouseUp)
    } else {
      body.removeEventListener('mousemove', this.handleProgressMouseMove)
      body.removeEventListener('mouseup', this.handleProgressMouseUp)
    }
  }

  render() {
    const {
      trackData,
      children,
      player: { volume, audio },
      stream: { canPlay }} = this.props

    const shouldFocus = classNames('mp-btn-volume', {
      'focus': volume.shouldExpand
    })
    const shouldPlayerSlide = classNames('music-player', {
      'is-open': canPlay
    })
    const shouldPlayPause = classNames('fa', {
      'fa-pause': audio.isPlaying,
      'fa-play': !audio.isPlaying
    })

    // Keep volume expanded as long as isDragging === true
    const shouldVolumeExpand = classNames('mp-volume-control', {
      'is-open': volume.isDragging ? true : volume.shouldExpand
    })

    // Multiply by 100 to get percentage
    const volumeLevel = `${volume.level * 1e2}%`
    const sliderStyle = {
      backgroundColor: volume.isMuted ? '#e09cc1' : '#f7379f',
      height: volumeLevel
    }

    // Sets artwork for current track:
    const artworkStyle = {
      background: `url(${trackData.getArtwork()}) no-repeat center center / cover`
    }

    // Set position percentage
    const barPosition = `${audio.position / audio.duration * 1e2}%`
    const progressStyle = {
      width: barPosition
    }

    const formatTime = (time = 0) => {
      let readableTime
      readableTime = {
        getHours() {
          const hours = `0${Math.floor(time / 3600)}`
          return hours.substr(-2)
        },
        getMinutes() {
          const minutes = `0${Math.floor((time % 3600) / 60)}`
          return minutes.substr(-2)
        },
        getSeconds() {
          const seconds = `0${Math.floor(time % 60)}`
          return seconds.substr(-2)
        }
      }
      return readableTime
    }

    const renderTime = (max, min = 0) => {
      const position = formatTime(max - min)
      const hours = position.getHours()
      const minutes = position.getMinutes()
      const seconds = position.getSeconds()
      if (parseInt(hours, 10)) {
        return (
          <small>{`${hours}:${minutes}:${seconds}`}</small>
        )
      }

      return (
        <small>{`${minutes}:${seconds}`}</small>
      )
    }

    const renderVolumeIcon = () => {
      if (volume.isMuted) {
        return (
          <span className="mp-mute">
            <i className="fa fa-volume-off" />
            <i className="fa fa-times" />
          </span>
        )
      } else if (volume.level === 0) {
        return <i className="fa fa-volume-off" />
      } else if (volume.level < 0.5) {
        return <i className="fa fa-volume-down" />
      }

      return <i className="fa fa-volume-up" />
    }

    const range = ref => this._range = ref
    const position = ref => this._position = ref

    return (
      <section
        // className={ shouldPlayerSlide }
        className="music-player is-open"
      >
        { children }
        <div className="container">
          <ul className="mp-controls">
            <li className="mp-artwork"
              style={ artworkStyle }
            />
            <li className="mp-play-pause">
              <Button
                btnClass="mp-btn-play-pause"
                onBtnClick={ this.handlePlayPause }
              >
                <i className={ shouldPlayPause } />
              </Button>
            </li>
            <li className="mp-details">
              <p className="mp-title">{trackData.songName}</p>
              <p className="mp-artist">{trackData.artistName}</p>
            </li>
            <li className="mp-timer-current">
              { renderTime(audio.position) }
            </li>
            <li className="mp-progress-bar"
              onMouseDown={ this.handleProgressMouseDown }
              onMouseMove={ this.handleProgressMouseMove }
              onMouseUp={ this.handleProgressMouseUp }
              ref={ position }
            >
              <div
                className="mp-progress-slider"
                style={ progressStyle }
              />
            </li>
            <li className="mp-timer-end">
              { renderTime(audio.duration, audio.position) }
            </li>
            <li
              className="mp-volume"
              onMouseEnter={ this.handleVolumeEnter }
              onMouseLeave={ this.handleVolumeLeave }
            >
              <Button
                btnClass={ shouldFocus }
                onBtnClick={ this.handleMute }
              >
                { renderVolumeIcon() }
              </Button>
              <aside
                className={ shouldVolumeExpand }
              >
                <div
                  className="mp-volume-range"
                  onMouseDown={ this.handleVolumeMouseDown }
                  onMouseMove={ this.handleVolumeMouseMove }
                  onMouseUp={ this.handleVolumeMouseUp }
                  ref= { range }
                >
                  <div
                    className="mp-volume-slider"
                    style={ sliderStyle }
                  />
                </div>
              </aside>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

AudioPlayer.propTypes = {
  audioRef: React.PropTypes.shape({
    _audio: React.PropTypes.object.isRequired
  }),
  children: React.PropTypes.node,
  player: React.PropTypes.shape({
    volume: React.PropTypes.object.isRequired
  }),
  playerActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  stream: React.PropTypes.shape({
    canPlay: React.PropTypes.bool,
    children: React.PropTypes.node,
    isPlaying: React.PropTypes.bool
  }),
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  trackData: React.PropTypes.object
}
