import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UserDescription from 'components/UserDescription'

function UserDescriptionContainer({ description }) {
  return (
    <UserDescription description={ description } />
  )
}

UserDescriptionContainer.propTypes = {
  description: PropTypes.string
}

function mapStateToProps(state, ownProps) {
  const {
    entities: { users }
  } = state.app
  const { params } = ownProps

  return {
    description: users[params.id].description
  }
}

export default connect(mapStateToProps)(UserDescriptionContainer)
