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
      userEntity,
      params
    } = this.props

    const user = userEntity[params.id]

    if (!user.description) {
      if (user.description !== undefined) {
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
      const reAtSound = /\s@(\S+\S)/i
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
            { text }
            <a
              className="user__description--link"
              href={ hasProtocol ? item[1] : `http://${item[1]}` }
            >
              { link }
            </a>
          </p>
        )
      }

      // Checks for SoundCloud link
      if (reAtSound.test(text)) {
        const atSound = text.match(reAtSound)
        const scUser = atSound[1]

        // If SC link is between text
        if (text.length > atSound[0].length) {
          const textSplit = text.split(atSound[0])

          return (
            <p
              className="user__description--paragraph"
              key={`description--soundcloud__${text}_${index}`}
            >
              { textSplit[0] }
              <a
                className="user__description--link user__description--atSoundCloud"
                href={ `https://soundcloud.com/${scUser}` }
              >
                { atSound[0] }
              </a>
              { textSplit[1] }
            </p>
          )
        }

        // Return single line SC link
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

      // Checks for mailto link
      if (reAtMail.test(text)) {
        const mail = text.match(reAtMail)[0]

        // If mailto link is between text
        if (text.length > mail.length) {
          const textSplit = text.split(mail)

          return (
            <p
              className="user__description--paragraph"
              key={`description--email__${mail}_${index}`}
            >
              { textSplit[0] }
              <a
                className="user__description--link user__description--mailto"
                href={ `mailto:${mail}` }
              >
                { mail }
              </a>
              { textSplit[1] }
            </p>
          )
        }

        // Return single line mailto link
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

      // Return regular paragraph
      return (
        <p
          className="user__description--paragraph"
          key={`description--text__${params.id}_${index}`}
        >
          { item[0] }
        </p>
      )
    })

    // Render
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
    entities: { users },
    partition: { tracksByUser }
  } = state.app

  return {
    tracksByUser,
    userEntity: users
  }
}

export default connect(mapStateToProps)(UserDescriptionContainer)
