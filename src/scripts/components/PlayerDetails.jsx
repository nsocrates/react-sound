import React from 'react'

const PlayerDetails = ({ songName = '', userName = '' }) => (
  <li className="player__ctrl player__track">
    <p className="player__track--title">{ songName }</p>
    <p className="player__track--user">{ userName }</p>
  </li>
)

PlayerDetails.propTypes = {
  songName: React.PropTypes.string,
  userName: React.PropTypes.string
}

export default PlayerDetails
