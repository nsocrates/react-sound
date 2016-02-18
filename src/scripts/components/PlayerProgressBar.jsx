import React from 'react'

export default class PlayerProgressBar extends React.Component {

  render() {
    const {
      componentMouseDown,
      componentMouseMove,
      componentMouseUp,
      componentStyle,
      rangeClassName,
      selectorClassName
    } = this.props
    const position = ref => this._position = ref

    return (
      <div
        className={rangeClassName }
        onMouseDown={ componentMouseDown }
        onMouseMove={ componentMouseMove }
        onMouseUp={ componentMouseUp }
        ref={ position }
      >
        <div
          className={selectorClassName }
          style={ componentStyle }
        />
      </div>
    )
  }
}

PlayerProgressBar.propTypes = {
  componentMouseDown: React.PropTypes.func,
  componentMouseMove: React.PropTypes.func,
  componentMouseUp: React.PropTypes.func,
  componentStyle: React.PropTypes.object,
  rangeClassName: React.PropTypes.string,
  selectorClassName: React.PropTypes.string
}
