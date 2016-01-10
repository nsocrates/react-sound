import React from 'react'
import MenuItem from './MenuItem'
import SearchModal from './SearchModal'
import classNames from 'classnames'

export default class Nav extends React.Component {
  render() {
    const { toggleMenu, genre, genreList, loadGenre } = this.props

    const menuItems = genreList.map((item, index) => {
      const active = classNames({ 'active': genre === item })

      return (
        <li
          className="genre"
          key={ index }
        >
          <MenuItem
            genre={ item }
            itemClassName={ active ? active : null }
            loadGenre={ loadGenre }
          >
            { item }
          </MenuItem>
        </li>
      )
    })

    return (
      <nav className="nav-bar">
        <div className="container">
          <ul className="nav-section">
            { menuItems }
          </ul>
          <ul className="nav-section">
            <li className="bars">
              <button onClick={ toggleMenu }>
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
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  loadGenre: React.PropTypes.func.isRequired,
  toggleMenu: React.PropTypes.func.isRequired
}
