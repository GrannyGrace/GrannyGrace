import React from 'react'

/**
 * COMPONENT
 */
class SubmitReview extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {}
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="title">Title: </label>
            <input name="title" type="text" />
          </div>
          <div>
            <label htmlFor="content">Your Review Here: </label>
            <input name="content" type="text" />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }
}

export default SubmitReview
