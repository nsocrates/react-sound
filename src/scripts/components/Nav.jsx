import React from 'react'
import MenuItem from './MenuItem'
import SearchModal from './SearchModal'
import { GENRES } from 'constants/ItemLists'

export default class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activeItem: this.props.genre }
    this.handleChange = this.handleChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillMount() {
    this.handleChange(this.props.genre)
  }

  componentWillReceiveProps(prevProps) {
    this.setState({ activeItem: prevProps.genre })
  }

  handleChange(genre) {
    this.props.onLoadGenre(genre)
  }

  handleToggle() {
    this.props.onToggleMenu()
  }

  renderMenuItems() {
    return GENRES.map((item, index) => (
      <MenuItem
        genre={ item }
        index={ index }
        isActive={ this.state.activeItem === item }
        key={ index }
        menuItemClass="genre"
        onChange={ this.handleChange }
      >
        { item }
      </MenuItem>
    ))
  }

  render() {
    return (
      <nav className="nav-bar">
        <div className="container">
          <ul className="nav-section">
            { this.renderMenuItems() }
          </ul>
          <ul className="nav-section">
            <li className="bars">
              <button onClick={ this.handleToggle }>
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
