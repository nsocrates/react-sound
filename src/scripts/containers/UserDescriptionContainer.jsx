import React, { PropTypes } from 'react'
import Loader from 'components/Loader'
import { loadUser } from 'actions/user'
import { splitLines } from 'utils/Utils'

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
      requested,
      userEntity,
      params
    } = this.props

    const user = userEntity[params.id]

    if (requested.isFetching || !user.description) {
      if (!user.description && user.description !== undefined) {
        return (
          <section className="user__description">
            <p className="user__description--none">
              { "USER DOES NOT HAVE A DESCRIPTION." }
            </p>
          </section>
        )
      }

      return <Loader className="loader--bottom" />
    }

    const paragraphs = splitLines(user.description).map((item, index) => {
      const reAtSound = /\s(@\S+\S)/i
      const reAtMail = /(\S+@\S+\.\S+)/i
      const text = item[0]
      const link = item[1]

      if (link) {
        const hasProtocol = /http/.test(link)

        return (
          <p
            className="user__description--paragraph"
            key={`description--text--link__${params.id}_${index}`}
          >
            <span className="user__description--span">
              { text }
            </span>
            <a
              className="user__description--link"
              href={ hasProtocol ? item[1] : `http://${item[1]}` }
            >
              { link }
            </a>
          </p>
        )
      }

      if (reAtSound.test(text)) {
        const scUser = text.split('@')[1]
        return (
          <p
            className="user__description--paragraph"
            key={`description--soundcloud__${text}_${index}`}
          >
            <a
              className="user__description--link user__description--atSoundCloud"
              href={ `https://soundcloud.com/${scUser}` }
            >
              { text }
            </a>
          </p>
        )
      }

      if (reAtMail.test(text)) {
        const mail = text.match(reAtMail)[0]

        if (text.length > mail.length) {
          const splitted = text.split(mail)

          return (
            <p
              className="user__description--paragraph"
              key={`description--email__${mail}_${index}`}
            >
              <span className="user__description--span">{ splitted[0] }</span>
              <a
                className="user__description--link user__description--mailto"
                href={ `mailto:${mail}` }
              >
                { mail }
              </a>
              <span>{ splitted[1] }</span>
            </p>
          )
        }

        return (
          <p
            className="user__description--paragraph"
            key={`description--email__${item[0]}_${index}`}
          >
            <a
              className="user__description--link user__description--mailto"
              href={ `mailto:${item[0]}` }
            >
              { item[0] }
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
        <div className="user__description--inner">
          { paragraphs }
        </div>
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
