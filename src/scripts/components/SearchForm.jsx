import React from 'react'

export default class SearchForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log('Form will mount')
  }

  componentWillUnmount() {
    console.log('Form will unmount')
  }

  render() {
    const { onFormSubmit, inputClassName, inputId, children } = this.props
    const input = ref => this._input = ref

    return (
      <form
        className="form-group"
        onSubmit={ onFormSubmit }
      >
        <input
          className={ inputClassName }
          id={ inputId }
          placeholder="Looking for something...?"
          ref={ input }
          type="text"
        />
        { children }
      </form>
    )
  }
}

SearchForm.propTypes = {
  children: React.PropTypes.node,
  inputClassName: React.PropTypes.string,
  inputId: React.PropTypes.string,
  onFormSubmit: React.PropTypes.func
}

SearchForm.defaultProps = {
  children: null,
  inputClassName: '',
  inputId: '',
  onFormSubmit() {}
}

export default SearchForm
