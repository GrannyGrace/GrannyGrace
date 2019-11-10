import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {fetchUpdateCart} from '../store/curCart'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import './single-product.css'
import SubmitReview from './submit-review'

const SingleProduct = props => {
  const {user, addToCart} = props
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id)
    //have to convert to integer
  }, [])
  const product = props.curProduct

  return (
    <div className="container">
      <div className="single-product-container">
        <h3>
          Product: {product.name}
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              addToCart(user.id, product.id)
            }}
          >
            Add To Cart
          </button>
        </h3>
        <img className="product-image" src={product.imageUrl} alt="apple" />
        <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
        <p style={{fontWeight: 'bold'}}>Category:{product.category} </p>
        <p style={{fontWeight: 'bold'}}>Quantity: {product.quantity}</p>
        <p style={{fontWeight: 'bold'}}>Product Descriptions: </p>
        <p>{product.description}</p>

        {props.user.isAdmin && <UpdateSingleProduct />}
        <AllReviews allReviews={product.reviews} />
        {/* <div className="side-by-side"> */}
        <SubmitReview />
        {/* </div> */}
      </div>
    </div>
  )
}

export default withRouter(
  connect(({curProduct, user}) => ({curProduct, user}), {
    fetchSingleProduct,
    addToCart: fetchUpdateCart
  })(SingleProduct)
)
