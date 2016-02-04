import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

import { loadGenre } from 'actions/genre'
import { loadSearch } from 'actions/search'
import { push } from 'react-router-redux'

class App extends React.Component {

  componentDidMount() {
    const { dispatch, hash } = this.props
    const ref = hash.split('?') || null

    const location = {
      pathname: ref[0] || '/',
      search: ref[1] ? `?${ref[1]}` : null
    }

    if (hash.match('genre')) {
      dispatch(loadGenre(hash.split('=')[1]))
    } else if (hash.match('search')) {
      dispatch(loadSearch(hash.split('=')[1]))
    }

    return dispatch(push(location))
  }

  render() {
    return (
      <div>
        <SearchModalContainer />
        <SideMenuContainer />
        <HeaderContainer />
        <NavContainer />
        { this.props.children }
        <AudioContainer />
      </div>
    )
  }
}

export default App

App.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired
}

App.defaultProps = {
  children: null
}

function mapStateToProps(state) {
  const { router } = state
  return {
    hash: router.location.hash
  }
}

export default connect(mapStateToProps)(App)
