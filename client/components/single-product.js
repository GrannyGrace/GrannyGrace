import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {Link, withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import './single-product.css'

const SingleProduct = props => {
  console.log('rendering singleproduct')
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id) //have to convert to integer
  }, [])
  const product = props.curProduct
  // console.log('TCL: props.match.params', props.match.params)
  // console.log('TCL: props', props)
  return (
    <div className="container">
      <div className="single-product-container">
        <h3>Product: {product.name}</h3>
        <p>$ {product.price}</p>
        <img className="product-image" src={product.imageUrl} alt="apple" />

        {props.user.isAdmin && <UpdateSingleProduct />}
        <AllReviews allReviews={product.reviews} />
      </div>
    </div>
  )
}

export default withRouter(
  connect(({curProduct, user}) => ({curProduct, user}), {fetchSingleProduct})(
    SingleProduct
  )
)
