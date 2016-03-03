import React, { PropTypes } from 'react'
import Canvas from 'components/Canvas'

export default function CanvasBanner({ canvasClassName, gradientColors, children }) {
  return (
    <div className="canvas-container">
      <Canvas
        className={`canvas ${canvasClassName}`}
        gradientColors={ gradientColors }
      />
      { children }
    </div>
  )
}

CanvasBanner.propTypes = {
  gradientColors: PropTypes.array,
  canvasClassName: PropTypes.string,
  children: PropTypes.node
}
