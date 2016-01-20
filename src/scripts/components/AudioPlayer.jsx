import React from 'react'
import classNames from 'classnames'
import Button from './Button'

export default class AudioPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.handlePlayPause = this.handlePlayPause.bind(this)
    this.handleFastBackward = this.handleFastBackward.bind(this) // TODO
    this.handleFastForward = this.handleFastForward.bind(this) // TODO
    this.handleMute = this.handleMute.bind(this)
    this.handleTrackList = this.handleTrackList.bind(this) // TODO
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnLeave = this.handleOnLeave.bind(this)
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this)
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this)
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this)
  }

  // Determines volume level based on cursor's Y position:
  getSliderValue(e) {
    const { clientY, currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const { height, bottom } = rect

    // Calculate value ( [max - offset] / size )
    const value = (bottom - clientY) / height

    // Round 2 decimal places
    return Math.round(value * 1e2) / 1e2
  }

  handlePlayPause() {
    const { stream, audioRef: { _audio }} = this.props

    return stream.isPlaying ? _audio.pause() : _audio.play()
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
    return console.log('handleFastForward')
  }

  handleMute() {
    const { playerActions, player: { volume }, audioRef: { _audio }} = this.props

    if (volume.isMuted) {
      _audio.volume = volume.level
      playerActions.muteVolume(false)
      return
    }

    // Set volume to 0 if isMuted prop is currently false
    _audio.volume = 0
    playerActions.muteVolume(true)
  }

  handleTrackList() {
    return console.log('handleTrackList')
  }

  handleOnEnter() {
    const { playerActions } = this.props
    playerActions.expandVolume(true)
  }

  handleOnLeave() {
    const { playerActions } = this.props
    playerActions.expandVolume(false)
  }

  handleVolumeMouseDown(e) {
    const { playerActions } = this.props
    const value = this.getSliderValue(e)

    playerActions.changeVolume(value, true)

    // Allow dragging on volume container
    this.bindEvents()
  }

  handleVolumeMouseMove(e) {
    const { playerActions, player: { volume }, audioRef: { _audio }} = this.props

    if (!volume.isDragging) {
      return
    }
    const value = this.getSliderValue(e)

    e.preventDefault()
    _audio.volume = value
    playerActions.changeVolume(value, true)
  }

  handleVolumeMouseUp(e) {
    const { playerActions, audioRef: { _audio }} = this.props
    const value = this.getSliderValue(e)

    _audio.volume = value
    playerActions.changeVolume(value, false)

    this.unbindEvents()
  }

  bindEvents() {
    this._volumeSlider.addEventListener('mousemove', this.handleVolumeMouseMove)
    this._volumeSlider.addEventListener('mouseup', this.handleVolumeMouseUp)
  }

  unbindEvents() {
    this._volumeSlider.removeEventListener('mousemove', this.handleVolumeMouseMove)
    this._volumeSlider.removeEventListener('mouseup', this.handleVolumeMouseUp)
  }

  render() {
    const {
      children,
      player: { volume },
      stream: { canPlay, isPlaying }} = this.props

    const shouldFocus = classNames('mp-btn', {
      'focus': volume.shouldExpand
    })
    const shouldPlayerSlide = classNames('music-player', {
      'is-open': canPlay
    })
    const shouldPlayPause = classNames('fa', {
      'fa-pause': isPlaying,
      'fa-play': !isPlaying
    })
    const shouldVolumeExpand = classNames('mp-volume-control', {
      'is-open': volume.shouldExpand
    })

    // Multiply by 100 to get percentage
    const volumeLevel = `${volume.level * 1e2}%`

    const volumeSlider = ref => this._volumeSlider = ref
    const renderVolumeIcon = () => {
      if (volume.isMuted) {
        return (
          <span>
            <i className="fa fa-volume-off" />
            <small>
              <i className="fa fa-times" />
            </small>
          </span>
        )
      } else if (volume.level >= 0.5) {
        return <i className="fa fa-volume-up" />
      }

      return <i className="fa fa-volume-down" />
    }

    return (
      <section
        // className={ shouldPlayerSlide }
        className="music-player is-open"
      >
        { children }
        <div className="container">
          <ul className="mp-controls">
            <h4 className="mp-hgroup">
                <li>
                  <Button
                    btnClass="mp-btn"
                    onBtnClick={ this.handleTrackList }
                  >
                    <i className="fa fa-list" />
                  </Button>
                </li>
                <li>
                  <Button
                    btnClass="mp-btn"
                    onBtnClick={ this.handleFastBackward }
                  >
                    <i className="fa fa-fast-backward" />
                  </Button>
                </li>
                <li>
                  <Button
                    btnClass="mp-btn"
                    onBtnClick={ this.handlePlayPause }
                  >
                    <i className={ shouldPlayPause } />
                  </Button>
                </li>
                <li>
                  <Button
                    btnClass="mp-btn"
                    onBtnClick={ this.handleFastForward }
                  >
                    <i className="fa fa-fast-forward" />
                  </Button>
                </li>
                <li>
                    <Button
                      btnClass={ shouldFocus }
                      onBtnClick={ this.handleMute }
                      onBtnEnter={ this.handleOnEnter }
                      onBtnLeave={ this.handleOnLeave }
                    >
                      { renderVolumeIcon() }
                    </Button>
                    <aside
                      className={ shouldVolumeExpand }
                      onMouseEnter={ this.handleOnEnter }
                      onMouseLeave={ this.handleOnLeave }
                      ref={ volumeSlider }
                    >
                      <div
                        className="mp-volume-range"
                        onMouseDown={ this.handleVolumeMouseDown }
                        onMouseMove={ this.handleVolumeMouseMove }
                        onMouseUp={ this.handleVolumeMouseUp }
                      >
                        <div
                          className="mp-volume-slider"
                          style={{ height: volumeLevel }}
                        />
                      </div>
                    </aside>
                </li>
              </h4>
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
  )
}
