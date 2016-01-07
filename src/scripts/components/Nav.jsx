import React from 'react'
import MenuItem from './MenuItem'
import SearchModal from './SearchModal'
import { GENRES } from 'constants/ItemLists'

export default class Nav extends React.Component {

  renderMenuItems() {
    const { genre, onLoadGenre } = this.props

    return GENRES.map((item, index) => (
      <MenuItem
        genre={ item }
        index={ index }
        isActive={ genre === item }
        key={ index }
        menuItemClass="genre"
        onLoadGenre={ onLoadGenre }
      >
        { item }
      </MenuItem>
    ))
  }

  render() {
    const { onToggleMenu } = this.props

    return (
      <nav className="nav-bar">
        <div className="container">
          <ul className="nav-section">
            { this.renderMenuItems() }
          </ul>
          <ul className="nav-section">
            <li className="bars">
              <button onClick={ onToggleMenu }>
                <i className="fa fa-bars" />
              </button>
            </li>
          </ul>
          <ul className="nav-search">
            <li className="search">
              <form className="form-group">
                <input
                  className="searchbar"
                  placeholder="Looking for something...?"
                  type="text"
                />
                <span className="focus-bar" />
                <i className="fa fa-search" />
              </form>
            </li>
          </ul>
          <SearchModal />
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  genre: React.PropTypes.string.isRequired,
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func.isRequired
}
