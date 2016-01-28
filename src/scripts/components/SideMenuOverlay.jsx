import React from 'react'

const SideMenuOverlay = ({ onOverlayClick = () => ({}) }) => (
  <div
    className="oc-overlay"
    onClick={ onOverlayClick }
  />
)

SideMenuOverlay.propTypes = {
  onOverlayClick: React.PropTypes.func
}

export default SideMenuOverlay
