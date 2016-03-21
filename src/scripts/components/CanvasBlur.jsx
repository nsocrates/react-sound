import React, { PropTypes } from 'react'
import CanvasGradient from 'components/CanvasGradient'
import StackBlur from 'utils/StackBlur'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    const { _canvas, props: { src } } = this
    this.img = new Image()
    this.ctx = _canvas.getContext('2d')

    this.img.crossOrigin = 'Anonymous'
    this.img.onload = () => this.handleResize()
    this.img.src = src

    window.addEventListener('resize', this.handleResize, false)
  }

  componentWillUpdate(nextProps) {
    if (this.img.src !== nextProps.src) {
      this.img.src = nextProps.src
    }

    return this.drawBlur()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.callResize()
    }, this.props.delay)
  }

  callResize() {
    this._canvas.width = this._canvas.offsetWidth
    this._canvas.height = this._canvas.offsetHeight

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
    const wh = w > h ? w : h
    const cX = (w - wh) / 2
    const cY = (h - wh) / 2

    // Handle CORS error
    try {
      this.ctx.drawImage(this.img, cX, cY, wh, wh)
    } catch (e) {
      return (this.hasError = true)
    }
    return StackBlur.canvasRGBA(this._canvas, 0, 0, w, h, blurRadius)
  }

  render() {
    const canvasRef = ref => (this._canvas = ref)
    const { className, height, width } = this.props

    if (this.hasError) {
      const { fallbackGradient } = this.props
      return (
        <CanvasGradient
          className={ className }
          colors={ fallbackGradient }
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
  delay: PropTypes.number,
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
  delay: 200,
  blurRadius: 15,
  height: 300,
  width: 300,
  fallbackGradient: [
    { offset: 0, color: '#B993D6' },
    { offset: 1, color: '#8CA6DB' }
  ]
}
