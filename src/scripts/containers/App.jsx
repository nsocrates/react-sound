import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { testBrowser } from 'actions/browser'
import { checkAuth } from 'actions/authenticate'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import NotificationContainer from './NotificationContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(testBrowser())
    dispatch(checkAuth())
  }

  render() {
    const { location, children } = this.props
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
}

App.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default connect()(App)
