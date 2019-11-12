import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store/curProduct'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

/**
 * COMPONENT
 */
class SubmitReview extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const review = {
      title: event.target.title.value,
      content: event.target.content.value
    }
    this.props.addReview(review, this.props.curProduct.id, this.props.user.id)
  }

  render() {
    if (!this.props.user.id) {
      return (
        <div className="col-md-4 col-sm-12 col-xs-12">
          <h5>Sign Up or Log In to write a review</h5>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Form onSubmit={this.onSubmit}>
            <div className="col-md-4 col-sm-12 col-xs-12 =">
              <h5>Write a Review!</h5>
              <div>
                <label htmlFor="title" />
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="title"
                />
              </div>
              <div className="">
                <Form.Label htmlFor="content" />
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="content"
                  type="text"
                  className="form-control"
                  placeholder="What did you think?"
                />
              </div>
              <Button type="submit">Submit Review</Button>
            </div>
          </Form>
        </div>
      )
    }
  }
}

export default connect(({user, curProduct}) => ({user, curProduct}), {
  addReview
})(SubmitReview)
