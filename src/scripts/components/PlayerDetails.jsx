import React from 'react'

const PlayerDetails = ({ songName = '', userName = '' }) => (
  <li className="mp-details">
    <p className="mp-title"><span>{ songName }</span></p>
    <p className="mp-artist">{ userName }</p>
  </li>
)

PlayerDetails.propTypes = {
  songName: React.PropTypes.string,
  userName: React.PropTypes.string
}

export default PlayerDetails
