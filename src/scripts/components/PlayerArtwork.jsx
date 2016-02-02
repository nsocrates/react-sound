import React from 'react'

const PlayerArtwork = ({ style = {}}) => (
  <aside
    className="player__artwork"
    style={ style }
  />
)

PlayerArtwork.propTypes = {
  style: React.PropTypes.object
}

export default PlayerArtwork
