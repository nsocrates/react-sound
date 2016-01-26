import React from 'react'

const PlayerArtwork = ({ styles = {}}) => (
  <li
    className="mp-artwork"
    style={ styles }
  />
)

PlayerArtwork.propTypes = {
  styles: React.PropTypes.object
}

export default PlayerArtwork
