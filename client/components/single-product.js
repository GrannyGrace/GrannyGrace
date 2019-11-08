import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import './single-product.css'
import SubmitReview from './submit-review'

const SingleProduct = props => {
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id)
    //have to convert to integer
  }, [])
  const product = props.curProduct

  return (
    <div className="container">
      <div className="single-product-container">
        <h3>Product: {product.name}</h3>
        <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
        <p style={{fontWeight: 'bold'}}>Category:{product.category} </p>
        <p style={{fontWeight: 'bold'}}>Quantity: {product.quantity}</p>

        <img className="product-image" src={product.imageUrl} alt="apple" />

        {props.user.isAdmin && <UpdateSingleProduct />}
        <AllReviews allReviews={product.reviews} />
        <SubmitReview />
      </div>
    </div>
  )
}

export default withRouter(
  connect(({curProduct, user}) => ({curProduct, user}), {fetchSingleProduct})(
    SingleProduct
  )
)
