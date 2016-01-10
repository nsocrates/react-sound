import React from 'react'

import HeaderContainer from './HeaderContainer'
import NavContainer from './NavContainer'
import MainContainer from './MainContainer'
import SideMenuContainer from './SideMenuContainer'
import SoundContainer from './SoundContainer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SideMenuContainer />
        <HeaderContainer />
        <NavContainer />
        <MainContainer />
        <SoundContainer />
      </div>
    )
  }
}
