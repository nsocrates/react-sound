import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

class App extends React.Component {

  componentDidMount() {
    const { dispatch, location: { hash }} = this.props
    const ref = hash.split('?') || null
    const [path, search] = ref

    const location = {
      pathname: path || '/',
      search: search ? `?${search}` : null
    }

    return dispatch(push(location))
  }

  render() {
    return (
      <div className="app__container">
        <SearchModalContainer />
        <SideMenuContainer />
        <HeaderContainer />
        <NavContainer location={ this.props.location } />
        { this.props.children }
        <AudioContainer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default connect()(App)
