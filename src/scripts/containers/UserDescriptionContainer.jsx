import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UserDescription from 'components/UserDescription'

function UserDescriptionContainer({ description, webProfiles, permaLink }) {
  return (
    <UserDescription
      description={ description }
      permaLink={ permaLink }
      webProfiles={ webProfiles }
    />
  )
}

UserDescriptionContainer.propTypes = {
  description: PropTypes.string,
  permaLink: PropTypes.string,
  webProfiles: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  const {
    entities: { users }
  } = state.app
  const { params } = ownProps

  return {
    description: users[params.id].description,
    permaLink: users[params.id].permalink_url,
    webProfiles: users[params.id].web_profiles
  }
}

export default connect(mapStateToProps)(UserDescriptionContainer)
