import React, { PropTypes } from 'react'
import Loader from 'components/Loader'
import ArticleContent from 'components/ArticleContent'
import { loadUser } from 'actions/user'

import { connect } from 'react-redux'

class UserDescriptionContainer extends React.Component {
  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props

    return dispatch(loadUser(params.id))
  }

  render() {
    const {
      userEntity,
      params
    } = this.props

    if (!userEntity[params.id] || userEntity[params.id].description === undefined) {
      return <Loader className="loader--bottom" />
    }

    const user = userEntity[params.id]
    return (
      <section className="article article--lg">
        <ArticleContent
          content={ user.description }
          missing={ "USER DOES NOT HAVE A DESCRIPTION." }
          wrapperClassName={ "article-wrap" }
        />
      </section>
    )
  }
}

UserDescriptionContainer.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  requested: PropTypes.object,
  userEntity: PropTypes.object
}

function mapStateToProps(state) {
  const {
    entities: { users },
    partition: { tracksByUser }
  } = state.app

  return {
    tracksByUser,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserDescriptionContainer)
