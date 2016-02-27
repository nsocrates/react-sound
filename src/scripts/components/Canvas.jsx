import React, { PropTypes } from 'react'

export default class Canvas extends React.Component {
  componentDidMount() {
    this.drawCanvas()
  }

  drawGradient(args) {
    const { ctx, _canvas, gradientColors } = args
    const { width, height } = _canvas
    const gradient = ctx.createLinearGradient(0, width, height, 0)

    gradientColors.forEach(gradientColor => {
      const { offset, color } = gradientColor
      gradient.addColorStop(offset, color)
    })

    ctx.fillStyle = gradient
    return ctx.fillRect(0, 0, width, height)
  }

  drawImage(args) {
    const { ctx, _canvas, imgSrc } = args
    const image = new Image()
    image.src = imgSrc

    image.onload = () => ctx.drawImage(image, 0, 0, _canvas.width, _canvas.height)
  }

  drawCanvas() {
    const { _canvas, props: { gradientColors, imgSrc }} = this
    const ctx = _canvas.getContext('2d')

    if (gradientColors) {
      const args = { ctx, _canvas, gradientColors }
      this.drawGradient(args)
    }

    if (imgSrc) {
      const args = { ctx, _canvas, imgSrc }
      this.drawImage(args)
    }
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
  gradientColors: PropTypes.array,
  height: PropTypes.string,
  imgSrc: PropTypes.string,
  width: PropTypes.string
}

Canvas.defaultProps = {
  className: 'canvas',
  gradientColors: null,
  height: '100%',
  imgSrc: '',
  width: '100%'
}
