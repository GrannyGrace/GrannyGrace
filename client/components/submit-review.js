import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store/curProduct'

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

  addToCart = productId => {
    if (this.props.user.id) {
      this.props.fetchUpdateCart(this.props.user.id, productId)
    } else {
      console.log(
        'user can only add to cart if logged in right now, need to add session support'
      )
    }
  }

  render() {
    const {curProduct} = this.props
    if (!this.props.user.id) {
      return (
        <div className="col-md-4 col-sm-12 col-xs-12">
          <h5>Sign Up or Log In to write a review</h5>
        </div>
      )
    } else {
      return (
        <div className="less-margin-left">
          <form onSubmit={this.onSubmit}>
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
                <label htmlFor="content" />
                <textarea
                  name="content"
                  type="text"
                  className="form-control"
                  placeholder="What did you think?"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default connect(({user, curProduct}) => ({user, curProduct}), {
  addReview
})(SubmitReview)
