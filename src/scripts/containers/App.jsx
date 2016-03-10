import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

class App extends React.Component {

  render() {
    return (
      <div className="app__container">
        <SearchModalContainer />
        <SideMenuContainer location={ this.props.location} />
        <HeaderContainer />
        <NavContainer location={ this.props.location} />
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
