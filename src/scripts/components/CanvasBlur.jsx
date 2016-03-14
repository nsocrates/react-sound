import React, { PropTypes } from 'react'
import CanvasGradient from 'components/CanvasGradient'
import StackBlur from 'utils/StackBlur'

export default class Canvas extends React.Component {
  componentDidMount() {
    const { _canvas, props: { src } } = this
    this.img = new Image()
    this.ctx = _canvas.getContext('2d')

    this.img.crossOrigin = 'Anonymous'
    this.img.onload = () => this.drawBlur()
    this.img.src = src
  }

  componentWillUpdate(nextProps) {
    if (this.img.src !== nextProps.src) {
      this.img.src = nextProps.src
    }

    return this.drawBlur()
  }

  drawBlur() {
    const {
      _canvas: {
        width: w,
        height: h
      },
      props: {
        blurRadius
      }
    } = this

    // Handle CORS error
    try {
      this.ctx.drawImage(this.img, 0, 0, w, h)
    } catch (e) {
      return (this.hasError = true)
    }

    return StackBlur.canvasRGBA(this._canvas, 0, 0, w, h, blurRadius)
  }

  render() {
    const canvasRef = ref => (this._canvas = ref)
    const { className, height, width } = this.props

    if (this.hasError) {
      return (
        <CanvasGradient
          className={ className }
          colors={ this.props.fallbackGradient }
          height={ height }
          ref={ canvasRef }
          width={ width }
        />
      )
    }

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
  blurRadius: PropTypes.number,
  fallbackGradient: PropTypes.arrayOf(
    PropTypes.shape({
      offset: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

Canvas.defaultProps = {
  className: 'canvas',
  blurRadius: 65,
  height: 300,
  width: 300,
  fallbackGradient: [
    { offset: 0, color: '#B993D6' },
    { offset: 1, color: '#8CA6DB' }
  ]
}
