import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/cur-product'
import {Link, withRouter} from 'react-router-dom'

const SingleProduct = props => {
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id) //have to convert to integer
  }, [])
  const product = props.curProduct
  console.log('TCL: props.match.params', props.match.params)
  return (
    <div>
      <div>Name: {product.name}</div>
      <div>Price: {product.price}</div>
      <img className="product-image" src={product.imageUrl} alt="apple" />
    </div>
  )
}

export default withRouter(
  connect(({curProduct}) => ({curProduct}), {fetchSingleProduct})(SingleProduct)
)
