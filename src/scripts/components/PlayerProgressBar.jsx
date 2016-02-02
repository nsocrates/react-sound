import React from 'react'

export default class PlayerProgressBar extends React.Component {

  render() {
    const {
      componentMouseDown,
      componentMouseMove,
      componentMouseUp,
      componentStyle
    } = this.props
    const position = ref => this._position = ref

    return (
      <li
        className="player__ctrl player__progress"
        onMouseDown={ componentMouseDown }
        onMouseMove={ componentMouseMove }
        onMouseUp={ componentMouseUp }
        ref={ position }
      >
        <div
          className="player__progress--slider"
          style={ componentStyle }
        />
      </li>
    )
  }
}

PlayerProgressBar.propTypes = {
  componentMouseDown: React.PropTypes.func,
  componentMouseMove: React.PropTypes.func,
  componentMouseUp: React.PropTypes.func,
  componentStyle: React.PropTypes.object
}
