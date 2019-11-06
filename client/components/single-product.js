import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'

const SingleProduct = props => {
  console.log('rendering singleproduct')
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id) //have to convert to integer
  }, [])
  const product = props.curProduct

  return (
    <div className="container">
      <div style={{marginTop: 50}}>
        <h3>Product: {product.name}</h3>
        <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
        <p style={{fontWeight: 'bold'}}>Category: </p>
        <p>{product.category}</p>
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
