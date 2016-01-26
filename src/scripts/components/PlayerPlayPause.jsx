import React from 'react'
import Button from './Button'

const PlayerPlayPause = ({ btnOnClick = () => ({}), iconClassName = '' }) => (
  <li className="mp-play-pause">
    <Button
      btnClass="mp-btn-play-pause"
      onBtnClick={ btnOnClick }
    >
      <i className={ iconClassName } />
    </Button>
  </li>
)

PlayerPlayPause.propTypes = {
  btnOnClick: React.PropTypes.func,
  iconClassName: React.PropTypes.string
}

export default PlayerPlayPause
