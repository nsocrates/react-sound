import React from 'react'
import Button from './Button'

const PlayerButton = ({ btnOnClick, iconClassName, btnClassName, className }) => (
  <li className={ className }>
    <Button
      btnClass={ btnClassName }
      onBtnClick={ btnOnClick }
    >
      <i className={ iconClassName } />
    </Button>
  </li>
)

PlayerButton.propTypes = {
  btnClassName: React.PropTypes.string,
  btnOnClick: React.PropTypes.func,
  className: React.PropTypes.string,
  iconClassName: React.PropTypes.string
}

PlayerButton.defaultProps = {
  btnClassName: null,
  btnOnClick() {},
  className: null,
  iconClassName: null
}

export default PlayerButton
