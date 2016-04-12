import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import NotificationContainer from './NotificationContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

function App({ location, children }) {
  return (
    <div className="app">
      <SearchModalContainer />
      <SideMenuContainer location={ location} />
      <HeaderContainer />
      <NavContainer location={ location} />
      { children }
      <AudioContainer />
      <NotificationContainer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}

export default connect()(App)
