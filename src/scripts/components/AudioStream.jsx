import React from 'react'

export default class AudioStream extends React.Component {

  constructor(props) {
    super(props)
    this.handleCanPlay = this.handleCanPlay.bind(this)
    this.handleEnded = this.handleEnded.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleLoadedMetaData = this.handleLoadedMetaData.bind(this)
    this.handleLoadStart = this.handleLoadStart.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }

  // Resets audio duration and position
  handleLoadStart() {
    const { playerActions, trackId } = this.props

    playerActions.pushTrack(trackId)
    playerActions.setDuration(0)
    playerActions.setPosition(0)
  }

  // Sets audio duration
  handleLoadedMetaData() {
    const { _audio, props: { playerActions } } = this

    playerActions.setDuration(_audio.duration)
  }

  // Plays audio when enough data has been loaded
  handleCanPlay() {
    const { _audio, props: { streamActions } } = this
    streamActions.streamCanPlay()

    _audio.play()
  }

  handlePlay() {
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(true)
  }

  handlePause() {
    const { playerActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    playerActions.toggleAudio(false)
  }

  // Sets audio current time
  handleTimeUpdate() {
    const { _audio, props: { playerActions, playerIsSeeking } } = this

    if (!playerIsSeeking) {
      playerActions.setPosition(_audio.currentTime)
    }
  }

  handleVolumeChange() {
    const { _audio: { volume, muted }, props: { playerActions } } = this

    return muted ? playerActions.muteVolume(muted) : playerActions.setVolume(volume)
  }

  handleEnded() {
    const { streamActions, tracklist, trackId } = this.props
    const listIds = tracklist.ids
    const trackPosition = tracklist.ids.indexOf(trackId)
    const next = listIds[trackPosition + 1]

    return next ? streamActions.requestStream(next) : streamActions.endStream()
  }

  handleError() {
    const { _audio: { error }, props: { streamActions } } = this

    streamActions.streamFailure(error)
  }

  render() {
    const { src } = this.props
    const audio = ref => (this._audio = ref)

    return (
      <audio
        id="audio"
        onCanPlay={ this.handleCanPlay }
        onEnded={ this.handleEnded }
        onError={ this.handleError }
        onLoadStart={ this.handleLoadStart }
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
  playerVolume: React.PropTypes.number,
  src: React.PropTypes.string,
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  trackId: React.PropTypes.number,
  tracklist: React.PropTypes.object
}

AudioStream.defaultProps = {
  src: null
}
