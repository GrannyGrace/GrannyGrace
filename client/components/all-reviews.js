import React from 'react'
import SingleReview from './single-review'

const AllReviews = props => {
  return (
    <div>
      {/* {props.reviews.map(reviewObj => {
        return <singleReview review={reviewObj} />
      })} */}
      <h1>Reviews here</h1>
      <SingleReview />
    </div>
  )
}

export default AllReviews

// reviews
// title, content, eager loading with product api
