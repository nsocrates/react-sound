import React from 'react'

const PlayerArtwork = ({ styles = {}}) => (
  <div
    className="mp-artwork"
    style={ styles }
  />
)

PlayerArtwork.propTypes = {
  styles: React.PropTypes.object
}

export default PlayerArtwork
