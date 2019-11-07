import React from 'react'

export default class searchBar extends React.Component {
  constructor() {
    super()
    this.state = {term: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({term: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="term">Search: </label>
        <input
          name="term"
          value={this.state.term}
          onChange={this.handleChange}
        />
        <button type="submit"> Search </button>
      </form>
    )
  }
}
