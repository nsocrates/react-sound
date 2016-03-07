import React, { PropTypes } from 'react'
// import Canvas from 'components/Canvas'
// import CanvasBlur from 'components/CanvasBlur'

export default class CanvasWrap extends React.Component {

  componentDidMount() {
    const { _canvas } = this
    this.ctx = _canvas.getContext('2d')
  }

  render() {
    const { children, canvasComponent, width, height, className } = this.props
    const ref = c => this._canvas = c
    const canvasWithProps = React.cloneElement(canvasComponent, {
      width,
      height,
      className,
      ref
    })
    return (
      <div className="canvas-container">
        { canvasWithProps }
        { children }
      </div>
    )
  }
}

CanvasWrap.propTypes = {
  imgSrc: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  canvasComponent: PropTypes.node
}
