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
    const { _search: { _input }, props: { apiActions }} = this
    apiActions.loadSearch(_input.value, false)
  }

  render() {
    const {
      apiActions,
      uiActions,
      genre,
      genreList,
      searchModal,
      navbar
    } = this.props

    const shouldExpandOverlay = classNames('m-overlay', {
      'is-open': searchModal.isOpen
    })
    const shouldStick = classNames('navbar', {
      'is-sticky': navbar.isSticky
    })
    const refNavbar = ref => this._navbar = ref
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
            loadGenre={ apiActions.loadGenre }
          >
            { item }
          </MenuItem>
        </li>
      )
    })

    return (
      <nav
        className={ shouldStick }
        ref={ refNavbar }
      >
        <div className="container">
          <ul className="nav-section">
            { menuItems }
          </ul>
          <ul className="nav-section">
            <li className="bars">
              <Button onBtnClick={ uiActions.toggleMenu }>
                <i className="fa fa-bars" />
              </Button>
            </li>
          </ul>
          <ul className="nav-search">
            <li className="search">
              <Button
                btnClass="m-btn-portal"
                onBtnClick={ uiActions.toggleModal }
              >
                <i className="fa fa-search" />
              </Button>
              <Overlay
                classNames={ shouldExpandOverlay }
                onOverlayClick={ uiActions.toggleModal }
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
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  apiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  ),
  genre: React.PropTypes.string.isRequired,
  genreList: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ),
  navbar: React.PropTypes.shape({
    isSticky: React.PropTypes.bool.isRequired
  }),
  searchModal: React.PropTypes.shape({
    isOpen: React.PropTypes.bool
  }),
  uiActions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}

Nav.defaultProps = {
  searchModal: null
}
