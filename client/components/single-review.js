import React from 'react'

const SingleReview = props => {
  function printStars(num) {
    let star = []
    for (let i = 0; i < num; i++) {
      star[i] = '⭐️'
    }
    return star.join('')
  }

  return (
    <div>
      <h5>{props.reviewObj.title}</h5>
      <p>{props.reviewObj.content}</p>
      <p>
        Ratings : {printStars(+props.reviewObj.stars)} {props.reviewObj.stars}{' '}
        stars
      </p>
    </div>
  )
}

export default SingleReview
