import React from 'react'
import MenuItem from './MenuItem'
import SearchForm from './SearchForm'
import Button from './Button'
import classNames from 'classnames'
import Overlay from './Overlay'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _search: { _input }, props: { actions }} = this
    actions.loadSearch(_input.value, false)
  }

  render() {
    const { actions, genre, genreList, children, searchModal } = this.props
    const shouldExpandOverlay = classNames('m-overlay', {
      'is-open': searchModal.isOpen
    })
    const search = ref => this._search = ref

    const menuItems = genreList.map((item, index) => {
      const active = classNames({ 'active': genre === item })

      return (
        <li
          className="genre"
          key={ index }
        >
          <MenuItem
            componentClass={ active ? active : null }
            genre={ item }
            loadGenre={ actions.loadGenre }
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
              <Button onBtnClick={ actions.toggleMenu }>
                <i className="fa fa-bars" />
              </Button>
            </li>
          </ul>
          <ul className="nav-search">
            <li className="search">
              <Button
                btnClass="m-btn-portal"
                onBtnClick={ actions.toggleModal }
              >
                <i className="fa fa-search" />
              </Button>
              <Overlay
                classNames={ shouldExpandOverlay }
                onOverlayClick={ actions.toggleModal }
              />
              <SearchForm
                formClassName="search-form"
                inputClassName="searchbar"
                onFormSubmit={ this.handleSubmit }
                ref={ search }
              >
                <span className="focus-bar" />
                <i className="fa fa-search" />
              </SearchForm>
            </li>
          </ul>
          { children }
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  children: React.PropTypes.node,
  genre: React.PropTypes.string.isRequired,
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  searchModal: React.PropTypes.shape({
    isOpen: React.PropTypes.bool
  })
}

Nav.defaultProps = {
  searchModal: null
}
