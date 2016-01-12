import React from 'react'

export default class SoundPlayer extends React.Component {

  render() {
    return (
      <section className="music-player">
        { this.props.children }
        <div className="container">
          <div className="mp-controls">
            <i className="fa fa-bars" />
            <i className="fa fa-fast-backward" />
            <i className="fa fa-pause" />
            <i className="fa fa-fast-forward" />
            <i className="fa fa-volume-up" />
          </div>
        </div>
      </section>
    )
  }
}

SoundPlayer.propTypes = {
  children: React.PropTypes.node,
  streamIsPlaying: React.PropTypes.bool,
  trackId: React.PropTypes.number
}
