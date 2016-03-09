import React from 'react'

export default class PlayerVolume extends React.Component {
  render() {
    const {
      componentMouseEnter,
      componentMouseLeave,
      btnClassName,
      btnOnClick,
      volumeIcon,
      children
    } = this.props
    return (
      <li
        className="player__ctrl player__volume"
        onMouseEnter={ componentMouseEnter }
        onMouseLeave={ componentMouseLeave }
      >
        <button
          className={ btnClassName }
          onClick={ btnOnClick }
        >
          { volumeIcon }
        </button>
          { children }
      </li>
    )
  }
}

PlayerVolume.propTypes = {
  btnClassName: React.PropTypes.string,
  btnOnClick: React.PropTypes.func,
  children: React.PropTypes.node,
  componentMouseEnter: React.PropTypes.func,
  componentMouseLeave: React.PropTypes.func,
  volumeControlClassName: React.PropTypes.string,
  volumeIcon: React.PropTypes.node
}
