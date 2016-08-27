import React from 'react'
import LinkItem from 'components/LinkItem'

export default function PlayerDetails(props) {
  const {
    trackId = 0,
    trackName = '',
    userId = 0,
    userName = ''
  } = props

  return (
    <li className="player__ctrl player__track">

      <p className="player__track--title">
        <LinkItem to={`/track/${trackId}`}>
          { trackName }
        </LinkItem>
      </p>

      <p className="player__track--user">
        <LinkItem to={`/user/${userId}`}>
          { userName }
        </LinkItem>
      </p>

    </li>
  )
}

PlayerDetails.propTypes = {
  trackId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  trackName: React.PropTypes.string,
  userId: React.PropTypes.number,
  userName: React.PropTypes.string
}
