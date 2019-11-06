import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {Link, withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'

const SingleProduct = props => {
  console.log('rendering singleproduct')
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id) //have to convert to integer
  }, [])
  const product = props.curProduct
  console.log('TCL: props.match.params', props.match.params)
  return (
    <div style={{marginTop: 50}}>
      <div>Name: {product.name}</div>
      <div>Price: {product.price}</div>
      <img className="product-image" src={product.imageUrl} alt="apple" />
      <UpdateSingleProduct />
    </div>
  )
}

export default withRouter(
  connect(({curProduct}) => ({curProduct}), {fetchSingleProduct})(SingleProduct)
)
