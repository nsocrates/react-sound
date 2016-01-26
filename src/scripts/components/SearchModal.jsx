import React from 'react'
import Button from './Button'
import SearchForm from './SearchForm'
import { GLOBAL_EVENTS } from 'constants/GlobalEvents'

export default class SearchModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.listenForClose = this.listenForClose.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('SearchModal Did Mount')
  }

  componentDidUpdate() {
    console.log('SearchModal Did Update')
    if (this.state.isOpen) window.onkeydown = this.listenForClose
    else window.onkeydown = null
  }

  componentWillUnmount() {
    console.log('SearchModal Will Unmount')
  }

  listenForClose(e = window.event) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.handleToggle()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { _mSearch: { _input }, props: { actions }} = this
    actions.loadSearch(_input.value, false)
  }

  handleToggle() {
    const open = !this.state.isOpen
    this.setState({ isOpen: open })
    this.emitState(open)
  }

  emitState(state) {
    GLOBAL_EVENTS.emit('searchModal', state)
  }

  render() {
    const mSearch = ref => this._mSearch = ref

    return (
      <div className="m-search">
        <div className="m-controller">
          <span
            className="m-modal"
            onClick={ this.handleToggle }
          />
          <Button
            btnClass="m-btn-search"
            onBtnClick={ this.handleToggle }
          >
            <i className="fa fa-search" />
          </Button>
          <Button
            btnClass="m-btn-times"
            onBtnClick={ this.handleToggle }
          >
            <h3><i className="fa fa-times" /></h3>
          </Button>
        </div>
        <SearchForm
          inputClassName="m-searchbar"
          inputId="m-searchbar"
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
