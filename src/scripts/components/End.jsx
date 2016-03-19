import React, { PropTypes } from 'react'

export default function End({
  className = 'end--top',
  text = 'NO MORE ITEMS TO DISPLAY.'
}) {
  const componentClassName = `end ${className}`

  return (
    <h5 className={ componentClassName.trim() }>
      { text }
    </h5>
  )
}

End.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
}
