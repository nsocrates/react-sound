import React, { PropTypes } from 'react'

export default class CanvasGradient extends React.Component {
  componentDidMount() {
    const { _canvas } = this
    this.ctx = _canvas.getContext('2d')

    return this.drawGradient()
  }

  drawGradient() {
    const { _canvas: { width: w, height: h }, props: { colors } } = this
    const gradient = this.ctx.createLinearGradient(0, 0, w, h)

    colors.forEach(item => {
      const { offset, color } = item
      gradient.addColorStop(offset, color)
    })

    this.ctx.fillStyle = gradient
    return this.ctx.fillRect(0, 0, w, h)
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

CanvasGradient.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.array.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

CanvasGradient.defaultProps = {
  className: 'canvas',
  height: 200,
  width: 200
}
