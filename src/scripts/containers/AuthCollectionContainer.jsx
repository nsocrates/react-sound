import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { loadAuthedCollection } from 'actions/auth'
import CollectionIndex from 'components/CollectionIndex'

class AuthCollectionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.updateComponent = this.updateComponent.bind(this)
  }

  componentDidMount() {
    const { dispatch, auth } = this.props
    const hasLocalStorage = !!localStorage.oauthio_provider_soundcloud

    if (!hasLocalStorage && !auth.result.isAuthorizing && !auth.result.isAuthorized) {
      return dispatch(replace({ location: '/' }))
    }

    if (auth.result.isAuthorized) {
      return this.updateComponent()
    }

    return null
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.auth.result.isAuthorized && newProps.auth.result.isAuthorized) {
      return this.updateComponent()
    }

    return null
  }

  updateComponent() {
    const { dispatch } = this.props
    return dispatch(loadAuthedCollection())
  }

  render() {
    const { auth, entities, dispatch, audioIsPlaying, streamTrackId } = this.props

    return (
      <CollectionIndex
        audioIsPlaying={ audioIsPlaying }
        auth={ auth }
        dispatch={ dispatch }
        entities={ entities }
        streamTrackId={ streamTrackId }
      />
    )
  }
}

AuthCollectionContainer.propTypes = {
  audioIsPlaying: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  streamTrackId: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const {
    auth,
    entities,
    media: {
      stream: { trackId },
      player: {
        audio: { isPlaying }
      }
    }
  } = state.app

  return {
    auth,
    entities,
    streamTrackId: trackId,
    audioIsPlaying: isPlaying
  }
}

export default connect(mapStateToProps)(AuthCollectionContainer)
