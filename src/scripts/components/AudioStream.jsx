import React from 'react'

export default class AudioStream extends React.Component {

  constructor(props) {
    super(props)
    this.handleCanPlay = this.handleCanPlay.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }

  // Plays audio when enough data has been loaded
  handleCanPlay() {
    console.log('canplay triggered...broadcasting action: streamCanPlay')
    const { _audio, props: { streamActions }} = this
    streamActions.streamCanPlay()

    _audio.play()
    console.log(_audio, this)
  }

  handlePlay() {
    console.log('play event triggered...broadcasting toggle ON')
    const { streamActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    streamActions.toggleStream(true)
  }

  handlePause() {
    console.log('pause event triggered...broadcasting toggle OFF')
    const { streamActions } = this.props

    // Dispatch action to set prop that renders play/pause button
    streamActions.toggleStream(false)
  }

  handleVolumeChange() {
    console.log(`volume has been changed to ${this._audio.volume}`)
  }

  render() {
    const { src } = this.props
    const audio = ref => this._audio = ref

    return (
      <audio
        id="audio"
        onCanPlay={ this.handleCanPlay }
        onPause={ this.handlePause }
        onPlay={ this.handlePlay }
        onVolumeChange={ this.handleVolumeChange }
        ref={ audio }
        src={ src }
      />
    )
  }
}

AudioStream.propTypes = {
  src: React.PropTypes.string,
  streamActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

AudioStream.defaultProps = {
  src: null
}
