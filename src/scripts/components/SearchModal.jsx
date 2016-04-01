import React from 'react'
import SearchForm from './SearchForm'
import Modal from './Modal'

export default class SearchModal extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { _mSearch: { _input } } = this

    _input.focus()
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _mSearch: { _input }, props: { actions } } = this
    const location = {
      pathname: '#search',
      query: {
        q: _input.value
      }
    }

    actions.toggleModal()
    actions.push(location)
  }

  render() {
    const { actions } = this.props
    const mSearch = ref => (this._mSearch = ref)

    return (
      <Modal
        className="modal modal--search"
        handleExit={ actions.toggleModal }
      >

        <button className="modal__close">
          <i className="fa fa-times" />
          <span className="reader">{"Close"}</span>
        </button>

        <div className="s-modal__wrapper">
          <SearchForm
            formClassName="s-modal__form"
            inputClassName="s-modal__input"
            onFormSubmit={ this.handleSubmit }
            ref={ mSearch }
          />
          <label className="s-modal__label">
            <h5 className="s-modal__label--text">
              { "Click anywhere to close (esc)" }
            </h5>
          </label>
        </div>

      </Modal>
    )
  }
}

SearchModal.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}
