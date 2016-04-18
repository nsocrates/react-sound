import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Main from 'components/Main'
import CollectionNav from 'components/CollectionNav'

class MeContainer extends React.Component {
  componentDidMount() {
    console.log('MeContainer.didMount')
  }

  render() {
    const { children, shouldPlay, location } = this.props
    return (
      <Main
        className="main main__container main__container--main"
        shouldPush={ shouldPlay }
      >
        { location.pathname !== '/me/stream' && <CollectionNav /> }
        { children }
      </Main>
    )
  }
}

MeContainer.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  shouldPlay: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const {
    media: {
      stream: { shouldPlay }
    }
  } = state.app

  return {
    shouldPlay
  }
}

export default connect(mapStateToProps)(MeContainer)
