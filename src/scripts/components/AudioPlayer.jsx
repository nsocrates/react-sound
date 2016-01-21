/*eslint no-console:0 */

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
    this.handleVolumeEnter = this.handleVolumeEnter.bind(this)
    this.handleVolumeLeave = this.handleVolumeLeave.bind(this)
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this)
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this)
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this)
  }

  // Determines volume level based on cursor's Y position:
  getSliderValue(e) {
    const { _range } = this
    const { clientY } = e
    const { height, bottom } = _range.getBoundingClientRect()

    // Calculate value ( [max - offset] / size )
    const value = (bottom - clientY) / height

    // Round 2 decimal places
    return Math.round(value * 1e2) / 1e2
  }

  clipNumber(num, min, max) {
    return Math.min(Math.max(num, min), max)
  }

  handlePlayPause() {
    const { player: { audio }, audioRef: { _audio }} = this.props
    return audio.isPlaying ? _audio.pause() : _audio.play()
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
    const { player: { volume }, audioRef: { _audio }} = this.props

    _audio.muted = !volume.isMuted
  }

  handleTrackList() {
    return console.log('handleTrackList')
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

    this.bindEventListeners()
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
    const { playerActions, player: { volume }, audioRef: { _audio }} = this.props

    if (!volume.isDragging) {
      return
    }

    const value = this.getSliderValue(e)
    _audio.volume = this.clipNumber(value, 0, 1)

    this.unbindEventListeners()
    playerActions.dragVolume(false)
  }

  bindEventListeners() {
    const body = document.body
    body.addEventListener('mousemove', this.handleVolumeMouseMove)
    body.addEventListener('mouseup', this.handleVolumeMouseUp)
  }

  unbindEventListeners() {
    const body = document.body
    body.removeEventListener('mousemove', this.handleVolumeMouseMove)
    body.removeEventListener('mouseup', this.handleVolumeMouseUp)
  }

  render() {
    const {
      children,
      player: { volume, audio },
      stream: { canPlay }} = this.props

    const shouldFocus = classNames('mp-btn', {
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
    const range = ref => this._range = ref
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
      } else if (volume.level === 0) {
        return <i className="fa fa-volume-off" />
      } else if (volume.level < 0.5) {
        return <i className="fa fa-volume-down" />
      }

      return <i className="fa fa-volume-up" />
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
                <li
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
                        ref={ range }
                      >
                        <div
                          className="mp-volume-slider"
                          style={ sliderStyle }
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
