import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {fetchUpdateCart} from '../store/curCart'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import './single-product.css'
import SubmitReview from './submit-review'
import Button from 'react-bootstrap/Button'

const SingleProduct = props => {
  useEffect(() => {
    console.log(props)
    props.fetchSingleProduct(+props.match.params.id)
  }, [])
  const product = props.curProduct

  return (
    <div className="container">
      <div className="single-product-container">
        <h3>Product: {product.name}</h3>
        <img className="product-image" src={product.imageUrl} alt="apple" />
        <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
        <p style={{fontWeight: 'bold'}}>Category:{product.category} </p>
        <p style={{fontWeight: 'bold'}}>Quantity: {product.quantity}</p>
        <p style={{fontWeight: 'bold'}}>Product Descriptions: </p>
        <p>{product.description}</p>
        <Button className="btn btn-primary" type="button" onClick={() => {}}>
          add to cart
        </Button>
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
