import React from 'react'

export default class SearchForm extends React.Component {
  render() {
    const { formClassName, onFormSubmit, inputClassName, inputId, children } = this.props
    const input = ref => this._input = ref

    return (
      <form
        className={ formClassName }
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
  formClassName: React.PropTypes.string,
  inputClassName: React.PropTypes.string,
  inputId: React.PropTypes.string,
  onFormSubmit: React.PropTypes.func
}

SearchForm.defaultProps = {
  children: null,
  formClassName: '',
  inputClassName: '',
  inputId: '',
  onFormSubmit() {}
}

export default SearchForm
