import React from 'react'

export default class SoundPlayer extends React.Component {

  render() {
    return (
      <div className="soundPlayer">
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
