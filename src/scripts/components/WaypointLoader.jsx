import React, { PropTypes } from 'react'
import End from 'components/End'
import Loader from 'components/Loader'
import Waypoint from 'components/Waypoint'

export default function WaypointLoader(props) {
  const {
    Type = 'div',
    isFetching,
    hasMore,
    onEnter,
    loaderProps = {},
    endProps = {},
    waypointProps = {}
} = props

  if (!hasMore && !isFetching) {
    return (
      <End { ...endProps} Type={ Type } />
    )
  }

  return (
    <Type>
      <Loader { ...loaderProps } />
      <Waypoint { ...waypointProps} onEnter={ onEnter } />
    </Type>
  )
}

WaypointLoader.propTypes = {
  endProps: PropTypes.object,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
  loaderProps: PropTypes.object,
  onEnter: PropTypes.func.isRequired,
  Type: PropTypes.string,
  waypointProps: PropTypes.object
}
