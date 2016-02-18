import React, { PropTypes } from 'react'
import Loader from 'components/Loader'
import { loadCachedUser } from 'actions/user'
import { splitLines } from 'utils/Utils'

import { connect } from 'react-redux'

class UserDescriptionContainer extends React.Component {
  componentDidMount() {
    return this.updateComponent()
  }

  updateComponent() {
    const { dispatch, params } = this.props

    return dispatch(loadCachedUser(params.id))
  }

  render() {
    const {
      requested,
      userEntity,
      params
    } = this.props

    const user = userEntity[params.id]

    if (!user.description || requested.isFetching) {
      return <Loader className="loader--bottom" />
    }

    const paragraphs = splitLines(user.description).map((item, index) => {
      if (item[1]) {
        return (
          <p
            className="user__description--paragraph"
            key={`description--text--link__${params.id}_${index}`}
          >
            <span className="user__description--span">
              { item[0] }
            </span>
            <a
              className="user__description--link"
              href={ item[1] }
            >
              { item[1] }
            </a>
          </p>
        )
      }

      return (
        <p
          className="user__description--paragraph"
          key={`description--text__${params.id}_${index}`}
        >
          { item[0] }
        </p>
      )
    })

    return (
      <section className="user__description">
        { paragraphs }
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
    requested,
    entities: { users },
    partition: { tracksByUser }
  } = state.app

  return {
    requested,
    tracksByUser,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserDescriptionContainer)
