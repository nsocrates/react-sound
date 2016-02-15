import React, { PropTypes } from 'react'

export default class Canvas extends React.Component {
  componentDidMount() {
    this.drawCanvas()
  }

  drawCanvas() {
    const { _canvas } = this
    const { width, height } = _canvas
    const ctx = _canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, height, 0)
    gradient.addColorStop(0,'rgba(38, 39, 40, 0.5)')
    gradient.addColorStop(1,'rgba(255, 255, 255, 0.5)')

    ctx.fillStyle = gradient
    return ctx.fillRect(0, 0, width, height)
  }

  render() {
    const canvasRef = ref => this._canvas = ref
    const { className, height, width } = this.props

    return (
      <canvas
        className={ className }
        height={ height }
        ref={ canvasRef }
        width={ width }
      />
    )
  }
}

Canvas.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

Canvas.defaultProps = {
  className: 'canvas',
  height: '100%',
  width: '100%'
}
