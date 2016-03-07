import React, { PropTypes } from 'react'
import StackBlur from 'utils/StackBlur'

export default class Canvas extends React.Component {
  componentDidMount() {
    const { _canvas, props: { src } } = this
    this.img = new Image()
    this.ctx = _canvas.getContext('2d')

    this.img.crossOrigin = 'Anonymous'
    this.img.onerror = () => this.handleError()
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
    this.ctx.drawImage(this.img, 0, 0, w, h)
    return StackBlur.canvasRGBA(this._canvas, 0, 0, w, h, blurRadius)
  }

  handleError() {
    this.img.src = require('images/300x300.jpg')
    return this.drawBlur()
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
  blurRadius: PropTypes.number,
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
  width: 300
}
