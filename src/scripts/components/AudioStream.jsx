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
    console.log('canplay triggered...broadcasting action: streamCanPlay')
    const { _audio, props: { streamActions }} = this
    streamActions.streamCanPlay()

    _audio.play()
  }

  handleLoadedMetaData() {
    const { _audio, props: { playerActions }} = this
    console.log(`Meta data loaded. Duration: ${_audio.duration}`)

    playerActions.getAudioDuration(_audio.duration)
  }

  handlePlay() {
    console.log('play event triggered...broadcasting toggle ON')
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(true)
  }

  handleTimeUpdate() {
    const { _audio, props: { playerActions }} = this

    playerActions.setAudioPosition(_audio.currentTime)
  }

  handlePause() {
    console.log('pause event triggered...broadcasting toggle OFF')
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(false)
  }

  handleVolumeChange() {
    console.log(`volume has been changed to ${this._audio.volume}`)
    console.log(`volume is muted ${this._audio.muted}`)
    const { _audio: { volume, muted }, props: { playerActions }} = this

    return muted ? playerActions.muteVolume(muted) : playerActions.setVolume(volume)
  }

  handleError() {
    const { _audio: { error }, props: { streamActions }} = this
    console.log(`error event triggered ${error}`)

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
  src: React.PropTypes.string,
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

AudioStream.defaultProps = {
  src: null
}
