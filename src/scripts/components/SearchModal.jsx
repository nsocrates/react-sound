import React from 'react'
import Button from './Button'
import SearchForm from './SearchForm'
import GlobalEvents from 'utils/GlobalEvents'

export default class SearchModal extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.listenForClose = this.listenForClose.bind(this)
  }

  componentDidMount() {
    const { hideBodyOverflow, _mSearch: { _input }} = this

    hideBodyOverflow(true)
    _input.focus()
  }

  componentWillUnmount() {
    const { hideBodyOverflow } = this

    hideBodyOverflow(false)
    this.onkeydown = null
  }

  listenForClose(e) {
    const { key, keyCode } = e
    const { actions } = this.props

    if (key === 'Escape' || keyCode === 27) {
      actions.toggleModal()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _mSearch: { _input }, props: { actions }} = this
    const location = {
      pathname: '#search',
      query: {
        q: _input.value
      }
    }

    actions.toggleModal()
    actions.push(location)
  }

  hideBodyOverflow(shouldHide) {
    GlobalEvents.emit('hideBodyOverflow', shouldHide)
  }

  render() {
    const { actions } = this.props
    const mSearch = ref => this._mSearch = ref

    return (
      <div
        className="modal__controller"
        onKeyDown={ this.listenForClose }
      >
        <Button
          btnClass="modal__btn"
          onBtnClick={ actions.toggleModal }
        >
          <h3><i className="fa fa-times" /></h3>
        </Button>
        <SearchForm
          formClassName="modal__form"
          inputClassName="modal__input"
          onFormSubmit={ this.handleSubmit }
          ref={ mSearch }
        >
          <label><h5>{ "Click anywhere to close (esc)" }</h5></label>
        </SearchForm>
      </div>
    )
  }
}

SearchModal.propTypes = {
  actions: React.PropTypes.objectOf(
    React.PropTypes.func.isRequired
  )
}
