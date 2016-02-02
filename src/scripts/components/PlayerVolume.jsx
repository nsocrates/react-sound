import React from 'react'
import Button from './Button'

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
        <Button
          btnClass={ btnClassName }
          onBtnClick={ btnOnClick }
        >
          { volumeIcon }
        </Button>
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
