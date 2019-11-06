import React from 'react'
import SingleReview from './single-review'

// const reviews = [
//   {
//     title: 'Great products!',
//     content: 'lalallam, dkkdkdk  dkkdkdkdkd',
//     stars: 3
//   },
//   {
//     title: 'YESSS bigg apples!',
//     content: 'oh yeas',
//     stars: 5
//   }
// ]

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
