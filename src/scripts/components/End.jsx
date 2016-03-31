import React, { PropTypes } from 'react'

export default function End({
  className = 'end--top',
  text = 'NO MORE ITEMS TO DISPLAY.',
  Type = 'h5'
}) {
  const componentClassName = `end ${className}`

  return (
    <Type className={ componentClassName.trim() }>
      { text }
    </Type>
  )
}

End.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  Type: PropTypes.string
}
