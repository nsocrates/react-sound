/*eslint no-console:0 */

import React from 'react'

export default class AudioStream extends React.Component {

  constructor(props) {
    super(props)
    this.handleCanPlay = this.handleCanPlay.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleLoadedMetaData = this.handleLoadedMetaData.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }

  // Plays audio when enough data has been loaded
  handleCanPlay() {
    const { _audio, props: { streamActions }} = this
    streamActions.streamCanPlay()

    _audio.play()
  }

  // Sets audio duration
  handleLoadedMetaData() {
    const { _audio, props: { playerActions }} = this

    playerActions.getDuration(_audio.duration)
  }

  handlePlay() {
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(true)
  }

  // Sets audio current time
  handleTimeUpdate() {
    const { _audio, props: { playerActions, playerIsSeeking }} = this

    if (!playerIsSeeking) {
      playerActions.setPosition(_audio.currentTime)
    }
  }

  handlePause() {
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(false)
  }

  handleVolumeChange() {
    const { _audio: { volume, muted }, props: { playerActions }} = this

    return muted ? playerActions.muteVolume(muted) : playerActions.setVolume(volume)
  }

  handleError() {
    const { _audio: { error }, props: { streamActions }} = this

    streamActions.streamFailure(error)
  }

  render() {
    const { src } = this.props
    const audio = ref => this._audio = ref

    return (
      <audio
        id="audio"
        onCanPlay={ this.handleCanPlay }
        onError={ this.handleError }
        onLoadedMetadata={ this.handleLoadedMetaData }
        onPause={ this.handlePause }
        onPlay={ this.handlePlay }
        onTimeUpdate={ this.handleTimeUpdate }
        onVolumeChange={ this.handleVolumeChange }
        ref={ audio }
        src={ src }
      />
    )
  }
}

AudioStream.propTypes = {
  playerActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  playerIsSeeking: React.PropTypes.bool,
  src: React.PropTypes.string,
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

AudioStream.defaultProps = {
  src: null
}
