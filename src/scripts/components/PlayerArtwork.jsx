import React from 'react'

export default function PlayerArtwork({ src }) {
  return (
    <li
      className="player__ctrl player__artwork artwork--badge"
    >
      <img className="player__artwork--img" src={ src }/>
    </li>
  )
}

PlayerArtwork.propTypes = {
  src: React.PropTypes.string
}
