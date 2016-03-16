import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class MeContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <noscript />
    )
  }
}

MeContainer.propTypes = {
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {
    app: {
      auth,
      pagination,
      partition: { commentsByTrack },
      entities: { users, playlists, tracks },
      media: {
        stream: { trackId, shouldPlay },
        player: {
          audio: { isPlaying }
        }
      }
    }
  } = state
  const { id } = ownProps.params

  return {
    auth,
    pagination,
    isPlaying,
    shouldPlay,
    commentsByTrack,
    trackId,
    trackEntity: tracks,
    userEntity: users,
    playlistObject: playlists[id]
  }
}

export default connect(mapStateToProps)(MeContainer)
