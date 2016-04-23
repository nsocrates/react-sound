import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import Main from 'components/Main'
import CollectionNav from 'components/CollectionNav'

class MeContainer extends React.Component {
  componentDidMount() {
    const { dispatch, user } = this.props
    const location = {
      pathname: '/genre',
      query: {
        q: 'Trance'
      }
    }

    return !user.accessToken && dispatch(replace(location))
  }

  render() {
    const { children, shouldPlay, location, user } = this.props
    return (
      <Main
        className="main main__container main__container--main"
        shouldPush={ shouldPlay }
      >
        { location.pathname !== '/me/stream' && <CollectionNav /> }
        { !!user.accessToken && children }
      </Main>
    )
  }
}

MeContainer.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    auth: { user },
    media: {
      stream: { shouldPlay }
    }
  } = state.app

  return {
    shouldPlay,
    user
  }
}

export default connect(mapStateToProps)(MeContainer)
