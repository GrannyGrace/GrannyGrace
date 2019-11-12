import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {fetchUpdateCart, fetchGuestCart} from '../store/curCart'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import '../css/single-product.css'
import SubmitReview from './submit-review'
import Button from 'react-bootstrap/Button'

const SingleProduct = props => {
  const {user, addToCart} = props
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id)
    console.log(props.curProduct)
  }, [])
  const product = props.curProduct

  return (
    <div className="container">
      <div className="single-product-container">
        <h3>Product: {product.name}</h3>
        <img className="product-image" src={product.imageUrl} alt="apple" />

        {product.availability && +product.quantity !== 0 ? (
          <React.Fragment>
            <p style={{fontWeight: 'bold'}}>$ {product.price}</p>

            <p style={{fontWeight: 'bold'}}>
              Category: {product.category && product.category.join(', ')}
            </p>

            <p style={{fontWeight: 'bold'}}>
              Quantity Available for Purchase: {product.quantity}
            </p>
            <p style={{fontWeight: 'bold'}}>Product Descriptions: </p>
            <p>{product.description}</p>
            <Button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                if (props.user.id) {
                  console.log('item should now be in cart')
                  props.fetchUpdateCart(props.user.id, product.id)
                } else {
                  console.log('single-product component')
                  props.fetchGuestCart(product.id)
                }
              }}
            >
              add to cart
            </Button>
          </React.Fragment>
        ) : (
          <h4>This product is currently unavailble for purchase</h4>
        )}

        {props.user.isAdmin && <UpdateSingleProduct />}
        <AllReviews allReviews={product.reviews} />
        <SubmitReview />
      </div>
    </div>
  )
}

export default withRouter(
  connect(({curProduct, user}) => ({curProduct, user}), {
    fetchSingleProduct,
    fetchUpdateCart,
    fetchGuestCart
  })(SingleProduct)
)
