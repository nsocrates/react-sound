import React from 'react'

const PlayerButton = ({ btnOnClick, iconClassName, btnClassName, className }) => (
  <li className={ className }>
    <button
      className={ btnClassName }
      onClick={ btnOnClick }
    >
      <i className={ iconClassName } />
    </button>
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
