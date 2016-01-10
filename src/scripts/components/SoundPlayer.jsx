import React from 'react'
import { constructStreamUrl } from 'utils/Utils'

export default class SoundPlayer extends React.Component {

  componentWillReceiveProps(nextProps) {
    this.toggleStream(nextProps.streamIsPlaying)
  }

  toggleStream(play) {
    if (play) {
      console.log('play triggered')
      this._stream.play()
    } else {
      console.log('pause triggered')
      this._stream.pause()
    }
  }

  render() {
    const { trackId } = this.props
    const src = constructStreamUrl(trackId)
    const stream = ref => this._stream = ref

    return (
      <div>
        <audio
          autoPlay
          id="soundPlayer"
          ref={ stream }
          src={ src }
        />
        { this.props.children }
      </div>
    )
  }
}

SoundPlayer.propTypes = {
  children: React.PropTypes.node,
  streamIsPlaying: React.PropTypes.bool,
  trackId: React.PropTypes.number
}
