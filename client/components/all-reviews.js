import React from 'react'
import SingleReview from './single-review'

const AllReviews = props => {
  return (
    <div>
      <h4>Customer Reviews</h4>
      {props.allReviews &&
        props.allReviews.map(reviewObj => {
          return <SingleReview key={reviewObj.content} reviewObj={reviewObj} />
        })}
    </div>
  )
}

export default AllReviews

// reviews
// title, content, eager loading with product api
