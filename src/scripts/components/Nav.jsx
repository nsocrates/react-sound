import React from 'react'
import MenuItem from './MenuItem'
import SearchModal from './SearchModal'
import classNames from 'classnames'

export default class Nav extends React.Component {

  render() {
    const { onToggleMenu, genre, genreList, onLoadGenre } = this.props

    const menuItems = genreList.map((item, index) => {
      const active = classNames({ 'active': genre === item })

      return (
        <li
          className="genre"
          key={ index }
        >
          <MenuItem
            genre={ item }
            itemClassName={ active }
            onLoadGenre={ onLoadGenre }
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
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  onLoadGenre: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func.isRequired
}
