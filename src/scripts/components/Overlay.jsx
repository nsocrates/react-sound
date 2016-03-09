import React from 'react'

const Overlay = ({ classNames = '', onOverlayClick = () => ({}) }) => (
  <span
    className={ classNames }
    onClick={ onOverlayClick }
  />
)

Overlay.propTypes = {
  classNames: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func
}

export default Overlay
