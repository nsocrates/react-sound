import React from 'react'

import AudioContainer from './AudioContainer'
import HeaderContainer from './HeaderContainer'
import MainContainer from './MainContainer'
import NavContainer from './NavContainer'
import SearchModalContainer from './SearchModalContainer'
import SideMenuContainer from './SideMenuContainer'

export default class App extends React.Component {
  render() {
    return (
      <div id="container-wrap">
        <SearchModalContainer />
        <SideMenuContainer />
        <HeaderContainer />
        <NavContainer />
        <MainContainer />
        <AudioContainer />
      </div>
    )
  }
}
