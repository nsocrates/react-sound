import React, { PropTypes } from 'react'
import End from 'components/End'
import Loader from 'components/Loader'
import Waypoint from 'components/Waypoint'

export default function WaypointLoader(props) {
  const {
    isFetching,
    hasMore,
    onEnter,
    loaderProps = {},
    endProps = {},
    waypointProps = {}
} = props

  if (isFetching) {
    return (
      <Loader { ...loaderProps} />
    )
  }

  if (!hasMore) {
    return (
      <End { ...endProps} />
    )
  }

  return (
    <Waypoint { ...waypointProps} onEnter={ onEnter } />
  )
}

WaypointLoader.propTypes = {
  endProps: PropTypes.object,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loaderProps: PropTypes.object,
  onEnter: PropTypes.func.isRequired,
  waypointProps: PropTypes.object
}
