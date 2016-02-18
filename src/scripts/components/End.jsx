import React, { PropTypes } from 'react'

export default function End({ className = 'end--top' }) {
  const componentClassName = `end ${className}`

  return (
    <h5 className={ componentClassName.trim() }>
      {"NO MORE ITEMS TO DISPLAY"}
    </h5>
  )
}

End.propTypes = {
  className: PropTypes.string
}
