import React from 'react'

export default class PlayerVolumeControl extends React.Component {
  render() {
    const {
      componentClassName,
      componentMouseDown,
      componentMouseMove,
      componentMouseUp,
      componentStyle
    } = this.props
    const range = ref => this._range = ref

    return (
      <aside className={ componentClassName }>
        <div
          className="player__volume--range"
          onMouseDown={ componentMouseDown }
          onMouseMove={ componentMouseMove }
          onMouseUp={ componentMouseUp }
          ref={ range }
        >
          <div
            className="player__volume--slider"
            style={ componentStyle }
          />
        </div>
      </aside>
    )
  }
}

PlayerVolumeControl.propTypes = {
  componentClassName: React.PropTypes.string,
  componentMouseDown: React.PropTypes.func,
  componentMouseMove: React.PropTypes.func,
  componentMouseUp: React.PropTypes.func,
  componentStyle: React.PropTypes.object
}
