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
      {/* {props.reviews.map(reviewObj => {
        return <singleReview review={reviewObj} />
      })} */}
      <h1>Reviews here</h1>
      {/* {console.log(props.allReviews)} */}
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
